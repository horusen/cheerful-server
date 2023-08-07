import { GenderSeeder } from 'src/users/gender/gender.seeder';
import { TypeUserSeeder } from '../../users/type-users/type-user.seeder';
import { Injectable } from '@nestjs/common';
import { CountrySeeder } from 'src/users/country/country.seeder';
import { CurrencySeeder } from 'src/currency/currenty.seeder';
import { BusinessTypeService } from 'src/business/business_type/business_type.service';
import { BusinessTypeSeeder } from 'src/business/business_type/business_type.seeder';
import { BusinessIndustrySeeder } from 'src/business/business_industry/industry.seeder';
import { FileTypeSeeder } from 'src/file/file_type/file_type.seeder';
import { ConnectionTypeSeeder } from 'src/connection/connection-type/connection-type.seeder';
import { InvitationStatusSeeder } from 'src/connection/invitation/invitation_status/invitation_status.seeder';
import { EntityTypeSeeder } from 'src/entity-type/entity-type.seeder';

@Injectable()
export class Seeder {
  constructor(
    public typeUserSeeder: TypeUserSeeder,
    public genderSeeder: GenderSeeder,
    public countrySeeder: CountrySeeder,
    public currencySeeder: CurrencySeeder,
    public businessTypeSeeder: BusinessTypeSeeder,
    public industrySeeder: BusinessIndustrySeeder,
    public fileTypeSeeder: FileTypeSeeder,
    public connectionTypeSeeder: ConnectionTypeSeeder,
    public invitationStatusSeeder: InvitationStatusSeeder,
    public entityTypeSeeder: EntityTypeSeeder,
  ) {}

  async seed() {
    await this.typeUserSeeder.seed();
    await this.genderSeeder.seed();
    await this.currencySeeder.seed();
    await this.countrySeeder.seed();
    await this.businessTypeSeeder.seed();
    await this.industrySeeder.seed();
    await this.fileTypeSeeder.seed();
    await this.connectionTypeSeeder.seed();
    await this.invitationStatusSeeder.seed();
    await this.entityTypeSeeder.seed();
  }
}
