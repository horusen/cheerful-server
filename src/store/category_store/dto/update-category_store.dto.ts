import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryStoreDto } from './create-category_store.dto';

export class UpdateCategoryStoreDto extends PartialType(CreateCategoryStoreDto) {}
