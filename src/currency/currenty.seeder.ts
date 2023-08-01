import { Currency } from 'src/currency/entities/currency.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencySeeder extends BaseSeeder<Currency> {
  constructor(
    @InjectRepository(Currency) public readonly repo: Repository<Currency>,
  ) {
    super(repo, [
      {
        name: 'Naira',
        symbol: '₦',
        code: 'NGN',
      },
      {
        name: 'Cedis',
        symbol: '₵',
        code: 'GHS',
      },
      {
        name: 'Franc CFA',
        symbol: 'CFA',
        code: 'XOF',
      },
    ]);
  }
}
