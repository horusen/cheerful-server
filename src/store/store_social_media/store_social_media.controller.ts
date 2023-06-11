import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreSocialMediaService } from './store_social_media.service';
import { CreateStoreSocialMediaDto } from './dto/create-store_social_media.dto';
import { UpdateStoreSocialMediaDto } from './dto/update-store_social_media.dto';

@Controller('store-social-media')
export class StoreSocialMediaController {
  constructor(
    private readonly storeSocialMediaService: StoreSocialMediaService,
  ) {}

  @Post()
  create(@Body() createStoreSocialMediaDto: CreateStoreSocialMediaDto) {
    return this.storeSocialMediaService.create(createStoreSocialMediaDto);
  }

  @Get()
  findAll() {
    return this.storeSocialMediaService.findAll();
  }

  @Get('store/:id')
  findAllByStoreId(@Param('id') id: string) {
    return this.storeSocialMediaService.findByStoreId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSocialMediaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreSocialMediaDto: UpdateStoreSocialMediaDto,
  ) {
    return this.storeSocialMediaService.update(+id, updateStoreSocialMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSocialMediaService.remove(+id);
  }
}
