import { TypeStoreService } from './../type-store/type-store.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CategoryStoreService } from './category_store/category_store.service';

@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    public categoryStoreService: CategoryStoreService,
    public typeService: TypeStoreService,
  ) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    const { category_store_id, type_store_id } = createStoreDto;

    const category = this.categoryStoreService.findOne(category_store_id);
    if (!category) throw new HttpException('Category not found', 422);

    const type = this.typeService.findOne(type_store_id);
    if (!type) throw new HttpException('Type not found', 422);

    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
