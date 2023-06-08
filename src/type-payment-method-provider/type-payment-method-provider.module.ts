import { Module } from '@nestjs/common';
import { TypePaymentMethodProviderService } from './type-payment-method-provider.service';
import { TypePaymentMethodProviderController } from './type-payment-method-provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypePaymentMethodProvider } from './entities/type-payment-method-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypePaymentMethodProvider])],
  controllers: [TypePaymentMethodProviderController],
  providers: [TypePaymentMethodProviderService],
})
export class TypePaymentMethodProviderModule {}
