import { Injectable } from '@nestjs/common';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';
import { BaseService } from 'src/shared/services/base.service';
import { FileType } from './entities/file_type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileTypeService extends BaseService<FileType> {
  constructor(
    @InjectRepository(FileType) private readonly _repo: Repository<FileType>,
  ) {
    super(_repo);
  }
}
