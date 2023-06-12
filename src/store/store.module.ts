import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { CategoryStore } from './category_store/entities/category_store.entity';
import { TypeStore } from 'src/type-store/entities/type-store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { CategoryStoreModule } from './category_store/category_store.module';
import { TypeStoreModule } from 'src/type-store/type-store.module';
import { StoreSocialMediaModule } from './store_social_media/store_social_media.module';
import { StorePaymentMethodModule } from './store-payment-method/store-payment-method.module';
import { StoreAddressModule } from './store-address/store-address.module';
import { FileModule } from 'src/file-service/file.module';

@Module({
  imports: [
    CategoryStoreModule,
    TypeStoreModule,
    FileModule,
    TypeOrmModule.forFeature([Store]),
    StoreSocialMediaModule,
    StorePaymentMethodModule,
    StoreAddressModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
