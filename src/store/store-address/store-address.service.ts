import { Injectable } from '@nestjs/common';
import { StoreAddress } from './entities/store-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class StoreAddressService extends BaseService<StoreAddress> {
  constructor(
    @InjectRepository(StoreAddress)
    private readonly _repo: Repository<StoreAddress>,
  ) {
    super(_repo);
  }

  async create(createDTO: any) {
    const element = await this.repo.save(createDTO);
    return await this.repo.findOne({
      where: { id: element.id },
      relations: ['city', 'state', 'country'],
    });
  }

  findByStoreId(storeId: number): Promise<StoreAddress[]> {
    return this._repo.find({
      where: { store_id: storeId },
      relations: ['city', 'state', 'country'],
    });
  }
}
