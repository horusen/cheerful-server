import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodProviderDto } from './dto/create-payment-method-provider.dto';
import { UpdatePaymentMethodProviderDto } from './dto/update-payment-method-provider.dto';
import { BaseService } from 'src/shared/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethodProvider } from './entities/payment-method-provider.entity';

@Injectable()
export class PaymentMethodProviderService extends BaseService<PaymentMethodProvider> {
  constructor(
    @InjectRepository(PaymentMethodProvider)
    private readonly categoryStoreRepository: Repository<PaymentMethodProvider>,
  ) {
    super(categoryStoreRepository);
  }
}
