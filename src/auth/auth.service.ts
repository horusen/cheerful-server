import { Store } from './../store/entities/store.entity';
import { DeepPartial } from 'typeorm';
import { UsersService } from './../users/users.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { StoreService } from 'src/store/store.service';

const RANDOM_BYTE_LENGTH = 8;
const SCRYPT_HASH_LENGTH = 32;

@Injectable()
export class AuthService {
  public constructor(
    public usersService: UsersService,
    public storeService: StoreService,
    public jwtService: JwtService,
  ) {}

  async login(
    user: User,
  ): Promise<{ user: User; accessToken: string; store?: Store }> {
    const payload = { user, sub: user.id };
    const response = { user };
    if (user.type_user_id == 2) {
      const store = await this.storeService.findByUserId(user.id);
      payload['store'] = store;
      response['store'] = store;
    }
    return { ...response, accessToken: this.jwtService.sign(payload) };
  }

  // TODO: add transaction to this method
  public async signup(user: DeepPartial<User>) {
    const _user = await this.usersService.find(user.email);
    if (_user) throw new UnprocessableEntityException('Email already in user');

    const hashedPassword = this.hashPassword(user.password);

    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    const response = { user: newUser };

    if (user.type_user_id == 2) {
      const newStore = await this.storeService.createByUserId(newUser.id);
    }

    return this.login(newUser);
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
