import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {
    super(storeRepository);
  }

  async createByUserId(userId: number) {
    const element = await this.repo.save({ user_id: userId });
    return await this.findOne(element.id);
  }

  async findByUserId(userId: number) {
    return await this.repo.findOne({ where: { user_id: userId } });
  }
}
