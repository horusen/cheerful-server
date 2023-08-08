import { TypeStore } from './entities/type-store.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeStoreSeeder extends BaseSeeder<TypeStore> {
  constructor(
    @InjectRepository(TypeStore) public readonly repo: Repository<TypeStore>,
  ) {
    super(repo, [
      {
        name: 'PRODUCT',
        description: 'PRODUCT',
      },
      {
        name: 'SERVICE',
        description: 'SERVICE',
      },
      {
        name: 'EXPERIENCE',
        description: 'EXPERIENCE',
      },
    ]);
  }
}
