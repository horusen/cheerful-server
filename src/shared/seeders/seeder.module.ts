import { TypeUsersModule } from 'src/users/type-users/type-users.module';
import { Seeder } from './seed';
import { Module } from '@nestjs/common';
import { GenderModule } from 'src/users/gender/gender.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { CountryModule } from 'src/users/country/country.module';
import { BusinessTypeModule } from 'src/business/business_type/business_type.module';
import { BusinessIndustryModule } from 'src/business/business_industry/business_industry.module';
import { FileTypeModule } from 'src/file/file_type/file_type.module';
import { ConnectionTypeModule } from 'src/connection/connection-type/connection-type.module';
import { InvitationStatusModule } from 'src/connection/invitation/invitation_status/invitation_status.module';
import { EntityTypeModule } from 'src/entity-type/entity-type.module';
import { StateModule } from 'src/state/state.module';
import { SocialMediaModule } from 'src/social-media/social-media.module';
import { TypeStoreModule } from 'src/store/type-store/type-store.module';
import { CategoryStoreModule } from 'src/store/category_store/category_store.module';

@Module({
  imports: [
    TypeUsersModule,
    GenderModule,
    CurrencyModule,
    CountryModule,
    BusinessTypeModule,
    BusinessIndustryModule,
    FileTypeModule,
    ConnectionTypeModule,
    InvitationStatusModule,
    EntityTypeModule,
    StateModule,
    SocialMediaModule,
    TypeStoreModule,
    CategoryStoreModule,
  ],
  controllers: [],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule {}
