import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { BaseService } from 'src/shared/services/base.service';
import { Currency } from './entities/currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService extends BaseService<Currency> {
  constructor(
    @InjectRepository(Currency) private readonly _repo: Repository<Currency>,
  ) {
    super(_repo);
  }
}
