import { JwtOauthGuard } from './guard/jwt-oauth/jwt-oauth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserSignupDTO } from './dtos/user-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: UserSignupDTO) {
    return await this.authService.signup(body);
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
