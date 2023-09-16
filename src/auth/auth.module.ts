import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { OtpModule } from './otp/otp.module';
import { UsersModule } from '../users/users.module';
import { FileModule } from '../file/file.module';
import { BusinessModule } from '../business/business.module';
import { EmailModule } from '../shared/email/email.module';
import { InvitationModule } from '../connection/invitation/invitation.module';
import { SessionModule } from '../session/session.module';
import { StoreModule } from '../store/store.module';
import { Sharedmodule } from '../shared/shared.module';

@Global()
@Module({
  imports: [
    UsersModule,
    FileModule,
    BusinessModule,
    InvitationModule,
    SessionModule,
    StoreModule,
    OtpModule,
    Sharedmodule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2days' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
