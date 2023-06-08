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

@Module({
  imports: [
    CategoryStoreModule,
    TypeStoreModule,
    TypeOrmModule.forFeature([Store]),
    StoreSocialMediaModule,
    StorePaymentMethodModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
