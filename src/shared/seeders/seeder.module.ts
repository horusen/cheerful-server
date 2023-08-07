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
    EntityTypeModule
  ],
  controllers: [],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule {}
