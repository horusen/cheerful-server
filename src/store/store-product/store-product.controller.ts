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
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('store-product')
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createStoreProductDto: CreateStoreProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.storeProductService.create(createStoreProductDto, image);
  }

  @Get('store/:id')
  findAllByStoreId(@Param('id') id: string) {
    return this.storeProductService.findByStoreId(+id);
  }

  @Get()
  findAll() {
    return this.storeProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeProductService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    return this.storeProductService.update(+id, updateStoreProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeProductService.remove(+id);
  }
}
