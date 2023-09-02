import { Module } from '@nestjs/common';
import { Sharedmodule } from 'src/shared/shared.module';
import { OtpService } from './services/otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { OtpStatus } from './entities/otp_status.entity';
import { OtpController } from './otp.controller';

@Module({
  imports: [Sharedmodule, TypeOrmModule.forFeature([Otp, OtpStatus])],
  providers: [OtpService],
  exports: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
