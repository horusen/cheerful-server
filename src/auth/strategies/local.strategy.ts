import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { scryptSync } from 'crypto';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    public userService: UsersService,
    public authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.find(email);

    if (!user) throw new UnprocessableEntityException('User is not found');

    const [salt, userPassword] = user.password.split('.');

    if (userPassword != scryptSync(password, salt, 32).toString())
      throw new UnprocessableEntityException('Invalid Password');

    return user;
  }
}
