import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeUsersService } from './type-users.service';
import { CreateTypeUserDto } from './dto/create-type-user.dto';
import { UpdateTypeUserDto } from './dto/update-type-user.dto';

@Controller('type-users')
export class TypeUsersController {
  constructor(private readonly typeUsersService: TypeUsersService) {}

  @Post()
  create(@Body() createTypeUserDto: CreateTypeUserDto) {
    return this.typeUsersService.create(createTypeUserDto);
  }

  @Get()
  findAll() {
    return this.typeUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeUserDto: UpdateTypeUserDto) {
    return this.typeUsersService.update(+id, updateTypeUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeUsersService.remove(+id);
  }
}
