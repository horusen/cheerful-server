import { Module, forwardRef } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { InvitationStatusModule } from './invitation_status/invitation_status.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { BusinessModule } from 'src/business/business.module';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/shared/email/email.module';
import { ConnectionModule } from '../connection.module';
import { SessionModule } from 'src/session/session.module';

// TODO Add expiration for the invitation

@Module({
  controllers: [InvitationController],
  providers: [InvitationService],
  imports: [
    InvitationStatusModule,
    TypeOrmModule.forFeature([Invitation]),
    BusinessModule,
    UsersModule,
    EmailModule,
    ConnectionModule,
    SessionModule,
  ],
  exports: [InvitationService],
})
export class InvitationModule {}
