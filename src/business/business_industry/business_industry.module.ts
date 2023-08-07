import { BusinessIndustry } from './entities/business_industry.entity';
import { Module } from '@nestjs/common';
import { BusinessIndustryService } from './business_industry.service';
import { BusinessIndustryController } from './business_industry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessIndustrySeeder } from './industry.seeder';

@Module({
  controllers: [BusinessIndustryController],
  providers: [BusinessIndustryService, BusinessIndustrySeeder],
  exports: [BusinessIndustrySeeder],
  imports: [TypeOrmModule.forFeature([BusinessIndustry])],
})
export class BusinessIndustryModule {}
