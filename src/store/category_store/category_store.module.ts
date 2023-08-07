import { Module } from '@nestjs/common';
import { CategoryStoreService } from './category_store.service';
import { CategoryStoreController } from './category_store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryStore } from './entities/category_store.entity';
import { CategoryStoreSeeder } from './category_store.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryStore])],
  controllers: [CategoryStoreController],
  providers: [CategoryStoreService, CategoryStoreSeeder],
  exports: [CategoryStoreService, CategoryStoreSeeder],
})
export class CategoryStoreModule {}
