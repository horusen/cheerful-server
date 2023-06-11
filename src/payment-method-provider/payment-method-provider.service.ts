import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethodProvider } from './entities/payment-method-provider.entity';

@Injectable()
export class PaymentMethodProviderService extends BaseService<PaymentMethodProvider> {
  constructor(
    @InjectRepository(PaymentMethodProvider)
    private readonly _repo: Repository<PaymentMethodProvider>,
  ) {
    super(_repo);
  }

  findByTypePaymentMethodProviderId(typePaymentMethodProviderId: number) {
    return this._repo.find({
      where: { type_payment_method_provider_id: typePaymentMethodProviderId },
    });
  }
}
