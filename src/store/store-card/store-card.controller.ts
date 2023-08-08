import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StoreCardService } from './store-card.service';
import { CreateStoreCardDto } from './dto/create-store-card.dto';
import { UpdateStoreCardDto } from './dto/update-store-card.dto';

@Controller('store-card')
export class StoreCardController {
  constructor(private readonly storeCardService: StoreCardService) {}

  @Post()
  @UseInterceptors(FileInterceptor('card_image'))
  create(
    @Body() createStoreCardDto: CreateStoreCardDto,
    @UploadedFile() card_image: Express.Multer.File,
  ) {
    return this.storeCardService.create(createStoreCardDto, card_image);
  }

  @Get()
  findAll() {
    return this.storeCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeCardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreCardDto: UpdateStoreCardDto,
  ) {
    return this.storeCardService.update(+id, updateStoreCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeCardService.remove(+id);
  }

  @Get('store/:id')
  findByStoreId(@Param('id') id: string) {
    return this.storeCardService.findByStoreId(+id);
  }
}
