// import { Store } from './../store/entities/store.entity';
import { DeepPartial } from 'typeorm';
import { UsersService } from './../users/users.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UserSignupDTO } from './dtos/user-signup.dto';
import { File } from 'src/file/file.entity';
import { FileService } from 'src/file/file.service';
import { BusinessService } from 'src/business/business.service';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';
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
  ) {}

  async login(user: User): Promise<{ user: User; accessToken: string }> {
    const payload = { user, sub: user.id };
    const response = { user };

    if (user.type_user_id == 2) {
      const business = await this.businessService.findByCreatorId(user.id);
      payload['business'] = business;
      response['business'] = business;
    }
    return { ...response, accessToken: this.jwtService.sign(payload) };
  }

  // TODO: add transaction to this method
  public async signup(userDTO: UserSignupDTO, profilePic: Express.Multer.File) {
    let image: File = null;

    const hashedPassword = this.hashPassword(userDTO.password);

    if (profilePic) {
      image = await this.fileService.uploadFile(
        profilePic.buffer,
        profilePic.originalname,
        FileTypeEnum.IMAGE,
      );
    }

    // TODO: Send email verification

    const newUser = await this.usersService.create({
      ...userDTO,
      password: hashedPassword,
      profile_pic_id: image?.id,
    });

    if (userDTO.type_user_id == 2) {
      await this.businessService.create({
        name: userDTO.business_name,
        creator_id: newUser.id,
      });
    }

    return this.login(newUser);
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
}
