import { Country } from './entities/country.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountrySeeder extends BaseSeeder<Country> {
  constructor(
    @InjectRepository(Country) public readonly repo: Repository<Country>,
  ) {
    super(repo, [
      {
        name: 'Nigeria',
        currency_id: 1,
        code: 'NG',
      },
      {
        name: 'Ghana',
        currency_id: 2,
        code: 'GH',
      },
      {
        name: 'Senegal',
        currency_id: 3,
        code: 'SN',
      },
    ]);
  }
}
