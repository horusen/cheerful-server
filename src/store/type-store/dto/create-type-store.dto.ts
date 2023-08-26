import { Allow, IsNotEmpty } from 'class-validator';

export class CreateTypeStoreDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
