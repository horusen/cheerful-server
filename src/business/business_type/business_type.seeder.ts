import { BusinessType } from './entities/business_type.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessTypeSeeder extends BaseSeeder<BusinessType> {
  constructor(
    @InjectRepository(BusinessType)
    public readonly repo: Repository<BusinessType>,
  ) {
    super(repo, [
      {
        name: 'Product',
        description: 'Product Business',
      },
      {
        name: 'Service',
        description: 'Service Business',
      },
    ]);
  }
}
