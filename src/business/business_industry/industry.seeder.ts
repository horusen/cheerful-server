import { BusinessIndustry } from './entities/business_industry.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessIndustrySeeder extends BaseSeeder<BusinessIndustry> {
  constructor(
    @InjectRepository(BusinessIndustry)
    public readonly repo: Repository<BusinessIndustry>,
  ) {
    super(repo, [
      {
        name: 'Retail',
        description: 'Retail Business',
      },
      {
        name: 'Real Estate',
        description: 'Real Estate Business',
      },
      {
        name: 'Food',
        description: 'Food Business',
      },
      {
        name: 'Health',
        description: 'Health Business',
      },
      {
        name: 'Education',
        description: 'Education Business',
      },
      {
        name: 'Entertainment',
        description: 'Entertainment Business',
      },
      {
        name: 'Transportation',
        description: 'Transportation Business',
      },
      {
        name: 'Technology',
        description: 'Technology Business',
      },
      {
        name: 'Finance',
        description: 'Finance Business',
      },
      {
        name: 'Manufacturing',
        description: 'Manufacturing Business',
      },
    ]);
  }
}
