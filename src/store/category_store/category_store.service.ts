import { Injectable } from '@nestjs/common';
import { CreateCategoryStoreDto } from './dto/create-category_store.dto';
import { UpdateCategoryStoreDto } from './dto/update-category_store.dto';
import { BaseService } from 'src/shared/services/base.service';
import { CategoryStore } from './entities/category_store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryStoreService extends BaseService<CategoryStore> {
  constructor(
    @InjectRepository(CategoryStore)
    private readonly categoryStoreRepository: Repository<CategoryStore>,
  ) {
    super(categoryStoreRepository);
  }
}
