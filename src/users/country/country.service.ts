import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService extends BaseService<Country> {
  constructor(
    @InjectRepository(Country)
    private readonly _repo: Repository<Country>,
  ) {
    super(_repo);
  }
}
