import { Injectable } from '@nestjs/common';
import { CreateBusinessIndustryDto } from './dto/create-business_industry.dto';
import { UpdateBusinessIndustryDto } from './dto/update-business_industry.dto';
import { BaseService } from 'src/shared/services/base.service';
import { BusinessIndustry } from './entities/business_industry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessIndustryService extends BaseService<BusinessIndustry> {
  constructor(
    @InjectRepository(BusinessIndustry)
    private readonly _repo: Repository<BusinessIndustry>,
  ) {
    super(_repo);
  }
}
