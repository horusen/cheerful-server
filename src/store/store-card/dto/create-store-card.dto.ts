import { Allow, IsNotEmpty } from 'class-validator';

export class CreateStoreCardDto {
  @IsNotEmpty()
  store_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  min_price: number;

  @Allow()
  card_image: string;
}
