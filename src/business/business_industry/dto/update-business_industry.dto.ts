import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessIndustryDto } from './create-business_industry.dto';

export class UpdateBusinessIndustryDto extends PartialType(CreateBusinessIndustryDto) {}
