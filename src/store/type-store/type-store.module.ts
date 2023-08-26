import { Module } from '@nestjs/common';
import { TypeStoreService } from './type-store.service';
import { TypeStoreController } from './type-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeStore } from './entities/type-store.entity';
import { TypeStoreSeeder } from './type-store.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([TypeStore])],
  controllers: [TypeStoreController],
  providers: [TypeStoreService, TypeStoreSeeder],
  exports: [TypeStoreService, TypeStoreSeeder],
})
export class TypeStoreModule {}
