import { JwtOauthGuard } from './guard/jwt-oauth/jwt-oauth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  UploadedFile,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserSignupDTO } from './dtos/user-signup.dto';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/shared/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    public authService: AuthService,
    public usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: UserSignupDTO,
    @UploadedFile() profilePic: Express.Multer.File,
  ) {
    const _user = await this.usersService.findByEmail(body.email);
    if (_user) throw new UnprocessableEntityException('Email already in use ');

    return await this.authService.signup(body, profilePic);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: Request) {
    return this.authService.login(req['user']);
  }

  @UseGuards(JwtOauthGuard)
  @Get()
  jwtRedirect(@Request() req: Request) {
    return req['user'];
  }
}
