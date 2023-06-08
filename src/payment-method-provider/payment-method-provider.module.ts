import { Module } from '@nestjs/common';
import { PaymentMethodProviderService } from './payment-method-provider.service';
import { PaymentMethodProviderController } from './payment-method-provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodProvider } from './entities/payment-method-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodProvider])],
  controllers: [PaymentMethodProviderController],
  providers: [PaymentMethodProviderService],
})
export class PaymentMethodProviderModule {}
