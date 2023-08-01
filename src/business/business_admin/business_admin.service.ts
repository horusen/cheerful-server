import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { BusinessAdmin } from './entities/business_admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessAdminService extends BaseService<BusinessAdmin> {
  constructor(
    @InjectRepository(BusinessAdmin)
    private readonly _repo: Repository<BusinessAdmin>,
  ) {
    super(_repo);
  }
}
