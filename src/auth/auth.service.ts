import { DeepPartial } from 'typeorm';
import { UsersService } from './../users/users.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

const RANDOM_BYTE_LENGTH = 8;
const SCRYPT_HASH_LENGTH = 32;

@Injectable()
export class AuthService {
  public constructor(
    public usersService: UsersService,
    public jwtService: JwtService,
  ) {}

  login(user: User) {
    const payload = { user, sub: user.id };
    return { user, accessToken: this.jwtService.sign(payload) };
  }

  public async signup(user: DeepPartial<User>) {
    const _user = await this.usersService.find(user.email);
    if (_user) throw new UnprocessableEntityException('Email already in user');

    const hashedPassword = this.hashPassword(user.password);

    return this.usersService.create({
      ...user,
      password: hashedPassword,
    });
  }

  public async signin(email: string, password: string) {
    const user = await this.usersService.find(email);

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
