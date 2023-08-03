import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { ConnectionTypeModule } from './connection-type/connection-type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Connection]), ConnectionTypeModule, InvitationModule],
  controllers: [ConnectionController],
  providers: [ConnectionService],
})
export class ConnectionModule {}
