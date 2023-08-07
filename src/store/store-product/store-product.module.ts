import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { StoreProductController } from './store-product.controller';
import { StoreProduct } from './entities/store-product.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProduct]), FileModule],
  controllers: [StoreProductController],
  providers: [StoreProductService],
})
export class StoreProductModule {}
