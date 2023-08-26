import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FileTypeModule } from './file_type/file_type.module';
import { FileService } from './file.service';

@Module({
  imports: [FileTypeModule, TypeOrmModule.forFeature([File])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
