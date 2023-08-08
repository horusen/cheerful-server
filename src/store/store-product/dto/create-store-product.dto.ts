import { Allow, IsNotEmpty } from 'class-validator';

export class CreateStoreProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  store_id: string;

  @Allow()
  image: string;

  @Allow()
  description: string;
}
