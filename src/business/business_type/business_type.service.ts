import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { BusinessType } from './entities/business_type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessTypeService extends BaseService<BusinessType> {
  constructor(
    @InjectRepository(BusinessType)
    private readonly _repo: Repository<BusinessType>,
  ) {
    super(_repo);
  }
}
