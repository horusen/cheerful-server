import { CategoryStore } from './entities/category_store.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryStoreSeeder extends BaseSeeder<CategoryStore> {
  constructor(
    @InjectRepository(CategoryStore)
    public readonly repo: Repository<CategoryStore>,
  ) {
    super(repo, [
      {
        name: 'Food & Drink',
        description: 'Food & Drink',
      },
      {
        name: 'Fashion',
        description: 'Fashion',
      },
      {
        name: 'Electronics',
        description: 'Electronics',
      },
      {
        name: 'Health & Beauty',
        description: 'Health & Beauty',
      },
      {
        name: 'Sports',
        description: 'Sports',
      },
      {
        name: 'IT & Software',
        description: 'IT & Software',
      },
      {
        name: 'Others',
        description: 'Others',
      },
    ]);
  }
}
