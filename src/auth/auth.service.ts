// import { Store } from './../store/entities/store.entity';
import { DeepPartial } from 'typeorm';
import { UsersService } from './../users/users.service';
import {
  Inject,
  Injectable,
  Req,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UserSignupDTO } from './dtos/user-signup.dto';
import { File } from 'src/file/file.entity';
import { FileService } from 'src/file/file.service';
import { BusinessService } from 'src/business/business.service';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';
import { EmailService } from 'src/shared/email/email.service';
import { TypeUserEnum } from 'src/users/type-users/type-user.enum';
import { InvitationService } from 'src/connection/invitation/invitation.service';
import { InvitationStatusEnum } from 'src/connection/invitation/invitation_status/invitation_status.enum';
import { StoreService } from 'src/store/store.service';

// import { StoreService } from 'src/store/store.service';

const RANDOM_BYTE_LENGTH = 8;
const SCRYPT_HASH_LENGTH = 32;

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
  ) {}

  async login(user: User): Promise<{ user: User; accessToken: string }> {
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

  // TODO: add transaction to this method
  public async signup(userDTO: UserSignupDTO, profilePic: Express.Multer.File) {
    let image: File = null;
    let user: User;

    const hashedPassword = this.hashPassword(userDTO.password);

    // TODO: Send email verification

    if (userDTO.type_user_id == TypeUserEnum.Individual) {
      user = await this.usersService.findByEmail(userDTO.email);

      if (!user) throw new UnprocessableEntityException('User is  not found');

      if (profilePic) {
        image = await this._saveProfilePic(profilePic);
      }

      await this.invitationService.updateInvitationStatus(
        userDTO.invitation_id,
        InvitationStatusEnum.Accepted,
      );

      user = await this.usersService.update(user.id, {
        ...userDTO,
        password: hashedPassword,
        profile_pic_id: image?.id,
      });
    } else {
      const _user = await this.usersService.findByEmail(userDTO.email);
      if (_user)
        throw new UnprocessableEntityException('Email already in use ');

      if (profilePic) {
        image = await this._saveProfilePic(profilePic);
      }
      user = await this.usersService.create({
        ...userDTO,
        password: hashedPassword,
        profile_pic_id: image?.id,
      });

      if (userDTO.type_user_id == TypeUserEnum.BusinessAdmin)
        await this.businessService.create({
          name: userDTO.business_name,
          creator_id: user.id,
        });
      else if (userDTO.type_user_id == TypeUserEnum.Merchant)
        await this.storeService.create({
          name: userDTO.store_name,
          creator_id: user.id,
        });
    }

    return this.login(user);
  }

  private async _saveProfilePic(profilePic: Express.Multer.File) {
    return await this.fileService.uploadFile(
      profilePic.buffer,
      profilePic.originalname,
      FileTypeEnum.IMAGE,
    );
  }

  public async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnprocessableEntityException('User is not found');

    const [salt, userPassword] = user.password.split('.');

    if (
      userPassword != scryptSync(password, salt, SCRYPT_HASH_LENGTH).toString()
    )
      throw new UnprocessableEntityException('Invalid Password');

    return user;
  }

  public hashPassword(password: string, salt?: string): string {
    salt = salt || randomBytes(RANDOM_BYTE_LENGTH).toString('hex');
    const cryptedPassword = scryptSync(password, salt, SCRYPT_HASH_LENGTH);
    return `${salt}.${cryptedPassword}`;
  }

  getCurrentUser(@Req() req: Request) {
    return req['user'];
  }
}
