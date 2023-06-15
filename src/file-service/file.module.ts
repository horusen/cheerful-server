import { Module } from '@nestjs/common';
import { FileServiceService } from './file-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileServiceService],
  exports: [FileServiceService],
})
export class FileModule {}
