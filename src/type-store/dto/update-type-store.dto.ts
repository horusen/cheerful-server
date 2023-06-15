import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeStoreDto } from './create-type-store.dto';

export class UpdateTypeStoreDto extends PartialType(CreateTypeStoreDto) {}
