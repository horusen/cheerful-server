import { Module } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { FileTypeController } from './file_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileType } from './entities/file_type.entity';
import { FileTypeSeeder } from './file_type.seeder';

@Module({
  controllers: [FileTypeController],
  providers: [FileTypeService, FileTypeSeeder],
  exports: [FileTypeSeeder, FileTypeService],
  imports: [TypeOrmModule.forFeature([FileType])],
})
export class FileTypeModule {}
