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
}
