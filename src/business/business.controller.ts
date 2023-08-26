import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { CreateBusinessDto } from './dto/create-business.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Patch(':id')
  @UseInterceptors(FileInterceptor('business_logo'))
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: CreateBusinessDto,
    @UploadedFile() businessLogo: Express.Multer.File,
  ) {
    return this.businessService.update(+id, updateBusinessDto, businessLogo);
  }
}
