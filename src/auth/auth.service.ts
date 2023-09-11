import { Injectable, Req, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BusinessService } from 'src/business/business.service';
import { InvitationService } from 'src/connection/invitation/invitation.service';
import { File } from 'src/file/file.entity';
import { FileService } from 'src/file/file.service';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';
import { EmailService } from 'src/shared/email/email.service';
import { HashService } from 'src/shared/services/hash/hash.service';
import { StoreService } from 'src/store/store.service';
import { TypeUserEnum } from 'src/users/type-users/type-user.enum';
import { User } from 'src/users/users.entity';
import { DataSource, EntityManager } from 'typeorm';
import { Business } from '../business/entities/business.entity';
import { Invitation } from '../connection/invitation/invitation.entity';
import { Store } from '../store/entities/store.entity';
import { UsersService } from './../users/users.service';
import { UserSignupDTO } from './dtos/user-signup.dto';
import { OtpService } from './otp/services/otp.service';

@Injectable()
export class AuthService {
  public constructor(
    public usersService: UsersService,
    public jwtService: JwtService,
    public fileService: FileService,
    public businessService: BusinessService,
    public emailService: EmailService,
    public invitationService: InvitationService,
    public storeService: StoreService,
    public hashService: HashService,
    public dataSource: DataSource,
    public otpService: OtpService,
  ) {}

  async login(user: User): Promise<{
    user: User;
    accessToken: string;
    type_user: TypeUserEnum;
    business?: Business;
    store?: Store;
  }> {
    const payload = { user, sub: user.id };
    const response = { user, type_user: user.type_user_id };

    if (user.type_user_id == TypeUserEnum.BusinessAdmin) {
      const business = await this.businessService.findByCreatorId(user.id);
      payload['business'] = business;
      response['business'] = business;
    } else if (user.type_user_id == TypeUserEnum.Merchant) {
      const store = await this.storeService.findByCreatorId(user.id);
      payload['store'] = store;
      response['store'] = store;
    }
    return { ...response, accessToken: this.jwtService.sign(payload) };
  }

  public async signup(userDTO: UserSignupDTO, profilePic: Express.Multer.File) {
    let user: User;
    if (userDTO.type_user_id == TypeUserEnum.Individual) {
      user = await this.signupIndividual(userDTO, profilePic);
    } else {
      user = await this.signupNonIndividual(userDTO, profilePic);
    }

    const otp = await this.otpService.generate(user.id);
    await this.emailService.sendOTP(user, otp);

    return this.login(user);
  }

  public async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    console.log(user);
    if (!user) throw new UnprocessableEntityException('User is not found');

    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );
    if (!isPasswordCorrect)
      throw new UnprocessableEntityException('Invalid password');

    return user;
  }

  async signupIndividual(
    userDTO: UserSignupDTO,
    profilePic: Express.Multer.File,
  ) {
    let user: User;
    let invitation: Invitation;

    // Check if the invitation exists
    try {
      invitation = await this.invitationService.findOne(userDTO.invitation_id);
    } catch (error) {
      throw new UnprocessableEntityException('Invitation not found');
    }

    // Check if the user already exists by email
    try {
      user = await this.usersService.findByEmail(userDTO.email);
    } catch (error) {
      throw new UnprocessableEntityException('User not found');
    }

    let image: File = null;
    const hashedPassword = await this.hashService.hash(userDTO.password);

    // Start the transaction
    await this.dataSource.transaction(async (manager) => {
      // Save profile picture if provided
      if (profilePic) {
        image = await this.saveProfilePic(profilePic, manager);
      }

      // Update user details
      await this.invitationService.acceptInvitation(invitation);

      user = await this.usersService.update(user.id, {
        ...userDTO,
        password: hashedPassword,
        profile_pic_id: image?.id,
      });
    });

    return user;
  }

  async signupNonIndividual(
    userDTO: UserSignupDTO,
    profilePic: Express.Multer.File,
  ) {
    let user = await this.usersService.findByEmail(userDTO.email);
    if (user) {
      throw new UnprocessableEntityException('Email already in use');
    }

    let image: File = null;
    const hashedPassword = await this.hashService.hash(userDTO.password);

    // Start the transaction
    await this.dataSource.transaction(async (manager) => {
      if (profilePic) {
        image = await this.saveProfilePic(profilePic, manager);
      }

      // Create a new user
      user = await this.usersService.createWithEntityManager(
        {
          ...userDTO,
          password: hashedPassword,
          profile_pic_id: image?.id,
        },
        manager,
      );

      // Create associated business or store depending of the type user
      if (userDTO.type_user_id == TypeUserEnum.BusinessAdmin) {
        await this.businessService.createWithEntityManager(
          {
            name: userDTO.business_name,
            creator_id: user.id,
          },
          manager,
        );
      } else if (userDTO.type_user_id == TypeUserEnum.Merchant) {
        await this.storeService.createWithEntityManager(
          {
            name: userDTO.store_name,
            creator_id: user.id,
          },
          manager,
        );
      }
    });

    return user;
  }

  async saveProfilePic(
    profilePic: Express.Multer.File,
    entityManager: EntityManager,
  ) {
    return await this.fileService.uploadFile(
      profilePic.buffer,
      profilePic.originalname,
      FileTypeEnum.IMAGE,
      entityManager,
    );
  }

  getCurrentUser(@Req() req: Request) {
    return req['user'];
  }
}
