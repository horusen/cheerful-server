import { GenderSeeder } from 'src/users/gender/gender.seeder';
import { TypeUserSeeder } from '../../users/type-users/type-user.seeder';
import { Injectable } from '@nestjs/common';
import { CountrySeeder } from 'src/users/country/country.seeder';
import { CurrencySeeder } from 'src/currency/currenty.seeder';

@Injectable()
export class Seeder {
  constructor(
    public typeUserSeeder: TypeUserSeeder,
    public genderSeeder: GenderSeeder,
    public countrySeeder: CountrySeeder,
    public currencySeeder: CurrencySeeder,
  ) {}

  async seed() {
    await this.typeUserSeeder.seed();
    await this.genderSeeder.seed();
    await this.currencySeeder.seed();
    await this.countrySeeder.seed();
  }
}
