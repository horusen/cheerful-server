import { Allow, IsNotEmpty } from 'class-validator';

export class CreateCategoryStoreDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
