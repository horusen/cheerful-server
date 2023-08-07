import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeStoreService } from './type-store.service';
import { CreateTypeStoreDto } from './dto/create-type-store.dto';
import { UpdateTypeStoreDto } from './dto/update-type-store.dto';

@Controller('type-store')
export class TypeStoreController {
  constructor(private readonly typeStoreService: TypeStoreService) {}

  @Post()
  create(@Body() createTypeStoreDto: CreateTypeStoreDto) {
    return this.typeStoreService.create(createTypeStoreDto);
  }

  @Get()
  findAll() {
    return this.typeStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeStoreDto: UpdateTypeStoreDto) {
    return this.typeStoreService.update(+id, updateTypeStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeStoreService.remove(+id);
  }
}
