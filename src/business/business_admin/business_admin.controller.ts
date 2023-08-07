import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessAdminService } from './business_admin.service';
import { CreateBusinessAdminDto } from './dto/create-business_admin.dto';
import { UpdateBusinessAdminDto } from './dto/update-business_admin.dto';

@Controller('business-admin')
export class BusinessAdminController {
  constructor(private readonly businessAdminService: BusinessAdminService) {}

  @Post()
  create(@Body() createBusinessAdminDto: CreateBusinessAdminDto) {
    return this.businessAdminService.create(createBusinessAdminDto);
  }

  @Get()
  findAll() {
    return this.businessAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessAdminDto: UpdateBusinessAdminDto) {
    return this.businessAdminService.update(+id, updateBusinessAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessAdminService.remove(+id);
  }
}
