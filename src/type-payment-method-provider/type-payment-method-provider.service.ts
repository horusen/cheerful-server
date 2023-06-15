import { Injectable } from '@nestjs/common';
import { CreateTypePaymentMethodProviderDto } from './dto/create-type-payment-method-provider.dto';
import { UpdateTypePaymentMethodProviderDto } from './dto/update-type-payment-method-provider.dto';
import { TypePaymentMethodProvider } from './entities/type-payment-method-provider.entity';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypePaymentMethodProviderService extends BaseService<TypePaymentMethodProvider> {
  constructor(
    @InjectRepository(TypePaymentMethodProvider)
    private readonly categoryStoreRepository: Repository<TypePaymentMethodProvider>,
  ) {
    super(categoryStoreRepository);
  }
}
