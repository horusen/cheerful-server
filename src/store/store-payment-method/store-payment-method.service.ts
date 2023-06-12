import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { StorePaymentMethod } from './entities/store-payment-method.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StorePaymentMethodService extends BaseService<StorePaymentMethod> {
  constructor(
    @InjectRepository(StorePaymentMethod)
    private readonly _repo: Repository<StorePaymentMethod>,
  ) {
    super(_repo);
  }

  async create(createDTO: any) {
    const element = await this.repo.save(createDTO);
    return await this.repo.findOne({
      where: { id: element.id },
      relations: {
        payment_method_provider: {
          type_payment_method_provider: true,
        },
      },
    });
  }

  findByStoreId(storeId: number): Promise<StorePaymentMethod[]> {
    return this._repo.find({
      where: { store_id: storeId },
      relations: {
        payment_method_provider: {
          type_payment_method_provider: true,
        },
      },
    });
  }
}
