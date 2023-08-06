import { Module } from '@nestjs/common';
import { EntityTypeSeeder } from './entity-type.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityType } from './entity-type.entity';

@Module({
  providers: [EntityTypeSeeder],
  exports: [EntityTypeSeeder],
  imports: [TypeOrmModule.forFeature([EntityType])],
})
export class EntityTypeModule {}
