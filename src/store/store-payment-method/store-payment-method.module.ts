import { Module } from '@nestjs/common';
import { StorePaymentMethodService } from './store-payment-method.service';
import { StorePaymentMethodController } from './store-payment-method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorePaymentMethod } from './entities/store-payment-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StorePaymentMethod])],
  controllers: [StorePaymentMethodController],
  providers: [StorePaymentMethodService],
})
export class StorePaymentMethodModule {}
