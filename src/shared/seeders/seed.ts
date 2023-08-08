import { StateSeeder } from './../../state/state.seeder';
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
import { SocialMediaSeeder } from 'src/social-media/social-media.seeder';
import { CategoryStoreSeeder } from 'src/store/category_store/category_store.seeder';
import { TypeStoreSeeder } from 'src/store/type-store/type-store.seeder';

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
    public socialMediaSeeder: SocialMediaSeeder,
    public stateSeeder: StateSeeder,
    public categoryStoreSeeder: CategoryStoreSeeder,
    public typeStoreSeeder: TypeStoreSeeder,
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
    await this.stateSeeder.seed();
    await this.socialMediaSeeder.seed();
    await this.categoryStoreSeeder.seed();
    await this.typeStoreSeeder.seed();
  }
}
