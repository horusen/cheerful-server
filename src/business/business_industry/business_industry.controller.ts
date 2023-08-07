import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessIndustryService } from './business_industry.service';
import { CreateBusinessIndustryDto } from './dto/create-business_industry.dto';
import { UpdateBusinessIndustryDto } from './dto/update-business_industry.dto';

@Controller('industry')
export class BusinessIndustryController {
  constructor(
    private readonly businessIndustryService: BusinessIndustryService,
  ) {}

  @Post()
  create(@Body() createBusinessIndustryDto: CreateBusinessIndustryDto) {
    return this.businessIndustryService.create(createBusinessIndustryDto);
  }

  @Get()
  findAll() {
    return this.businessIndustryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessIndustryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessIndustryDto: UpdateBusinessIndustryDto,
  ) {
    return this.businessIndustryService.update(+id, updateBusinessIndustryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessIndustryService.remove(+id);
  }
}
