import { FileType } from './entities/file_type.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileTypeSeeder extends BaseSeeder<FileType> {
  constructor(
    @InjectRepository(FileType) public readonly repo: Repository<FileType>,
  ) {
    super(repo, [
      {
        name: 'IMAGE',
      },
      {
        name: 'VIDEO',
      },
      {
        name: 'DOCUMENT',
      },
      {
        name: 'AUDIO',
      },
      {
        name: 'OTHER',
      },
    ]);
  }
}
