import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';

@Controller('file-type')
export class FileTypeController {
  constructor(private readonly fileTypeService: FileTypeService) {}

  @Post()
  create(@Body() createFileTypeDto: CreateFileTypeDto) {
    return this.fileTypeService.create(createFileTypeDto);
  }

  @Get()
  findAll() {
    return this.fileTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileTypeDto: UpdateFileTypeDto) {
    return this.fileTypeService.update(+id, updateFileTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileTypeService.remove(+id);
  }
}
