import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryStoreService } from './category_store.service';
import { CreateCategoryStoreDto } from './dto/create-category_store.dto';
import { UpdateCategoryStoreDto } from './dto/update-category_store.dto';

@Controller('category-store')
export class CategoryStoreController {
  constructor(private readonly categoryStoreService: CategoryStoreService) {}

  @Post()
  create(@Body() createCategoryStoreDto: CreateCategoryStoreDto) {
    return this.categoryStoreService.create(createCategoryStoreDto);
  }

  @Get()
  findAll() {
    return this.categoryStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryStoreDto: UpdateCategoryStoreDto) {
    return this.categoryStoreService.update(+id, updateCategoryStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryStoreService.remove(+id);
  }
}
