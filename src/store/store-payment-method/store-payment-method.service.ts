import { Injectable } from '@nestjs/common';
import { CreateStorePaymentMethodDto } from './dto/create-store-payment-method.dto';
import { UpdateStorePaymentMethodDto } from './dto/update-store-payment-method.dto';
import { BaseService } from 'src/shared/services/base.service';
import { StorePaymentMethod } from './entities/store-payment-method.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StorePaymentMethodService extends BaseService<StorePaymentMethod> {
  constructor(
    @InjectRepository(StorePaymentMethod)
    private readonly categoryStoreRepository: Repository<StorePaymentMethod>,
  ) {
    super(categoryStoreRepository);
  }
}
