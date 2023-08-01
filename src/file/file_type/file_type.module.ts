import { Module } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { FileTypeController } from './file_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileType } from './entities/file_type.entity';

@Module({
  controllers: [FileTypeController],
  providers: [FileTypeService],
  exports: [FileTypeService],
  imports: [TypeOrmModule.forFeature([FileType])],
})
export class FileTypeModule {}
