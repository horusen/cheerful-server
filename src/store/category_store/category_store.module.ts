import { Module } from '@nestjs/common';
import { CategoryStoreService } from './category_store.service';
import { CategoryStoreController } from './category_store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryStore } from './entities/category_store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryStore])],
  controllers: [CategoryStoreController],
  providers: [CategoryStoreService],
  exports: [CategoryStoreService],
})
export class CategoryStoreModule {}
