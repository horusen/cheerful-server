import { StoreCardModule } from './store-card/store-card.module';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { CategoryStoreModule } from './category_store/category_store.module';
import { StoreSocialMediaModule } from './store_social_media/store_social_media.module';
import { StoreAddressModule } from './store-address/store-address.module';
import { StoreProductModule } from './store-product/store-product.module';
import { FileModule } from 'src/file/file.module';
import { TypeStoreModule } from './type-store/type-store.module';

@Module({
  imports: [
    CategoryStoreModule,
    TypeStoreModule,
    FileModule,
    TypeOrmModule.forFeature([Store]),
    StoreSocialMediaModule,
    StoreAddressModule,
    StoreCardModule,
    StoreProductModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
