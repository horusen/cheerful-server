import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Global, Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { FileModule } from 'src/file/file.module';
import { BusinessModule } from 'src/business/business.module';
import { EmailModule } from 'src/shared/email/email.module';
import { InvitationModule } from 'src/connection/invitation/invitation.module';
import { SessionModule } from 'src/session/session.module';
import { StoreModule } from 'src/store/store.module';

@Global()
@Module({
  imports: [
    UsersModule,
    FileModule,
    BusinessModule,
    EmailModule,
    InvitationModule,
    SessionModule,
    StoreModule,
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
