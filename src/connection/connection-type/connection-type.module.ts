import { Module } from '@nestjs/common';
import { ConnectionTypeService } from './connection-type.service';
import { ConnectionTypeController } from './connection-type.controller';
import { ConnectionTypeSeeder } from './connection-type.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionType } from './connection-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionType])],
  controllers: [ConnectionTypeController],
  providers: [ConnectionTypeService, ConnectionTypeSeeder],
  exports: [ConnectionTypeService, ConnectionTypeSeeder],
})
export class ConnectionTypeModule {}
