import { BusinessIndustry } from './entities/business_industry.entity';
import { Module } from '@nestjs/common';
import { BusinessIndustryService } from './business_industry.service';
import { BusinessIndustryController } from './business_industry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BusinessIndustryController],
  providers: [BusinessIndustryService],
  imports: [TypeOrmModule.forFeature([BusinessIndustry])],
})
export class BusinessIndustryModule {}
