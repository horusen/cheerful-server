import { Module } from '@nestjs/common';
import { InvitationStatusService } from './invitation_status.service';
import { InvitationStatusController } from './invitation_status.controller';
import { InvitationStatusSeeder } from './invitation_status.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationStatus } from './invitation_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationStatus])],
  controllers: [InvitationStatusController],
  providers: [InvitationStatusService, InvitationStatusSeeder],
  exports: [InvitationStatusService, InvitationStatusSeeder],
})
export class InvitationStatusModule {}
