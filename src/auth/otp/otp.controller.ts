import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { verifyOtpDto } from './dtos/verify-otp.dto';

@Controller('auth/otp')
export class OtpController {
  constructor(public otpService: OtpService) {}

  @Post('send')
  send(@Body() body: { userId: number }) {
    return this.otpService.send(body.userId);
  }

  @Post('verify')
  verify(@Body() body: verifyOtpDto) {
    return this.otpService.verify(body.userId, body.code);
  }
}
