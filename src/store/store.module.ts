import { Module } from '@nestjs/common';
import { CategoryStoreModule } from './category_store/category_store.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CategoryStoreModule],
  controllers: [],
  providers: [],
})
export class StoreModule {}
