import { TypeUsersModule } from 'src/users/type-users/type-users.module';
import { Seeder } from './seed';
import { Module } from '@nestjs/common';
import { GenderModule } from 'src/users/gender/gender.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { CountryModule } from 'src/users/country/country.module';

@Module({
  imports: [TypeUsersModule, GenderModule, CurrencyModule, CountryModule],
  controllers: [],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule {}
