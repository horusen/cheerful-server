import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { verifyOtpDto } from './dtos/verify-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(public otpService: OtpService) {}

  @Get('generate/:user_id')
  generate(@Param('user_id') userId: number) {
    return this.otpService.generate(userId);
  }

  @Post('verify')
  verify(@Body() body: verifyOtpDto) {
    return this.otpService.verify(body.userId, body.code);
  }
}
