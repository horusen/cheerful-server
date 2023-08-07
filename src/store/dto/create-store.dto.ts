import { Expose } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category_store_id: number;

  @IsNotEmpty()
  type_store_id: number;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  online_link: string;

  @IsNotEmpty()
  card_min_price: number;

  @Allow()
  logo_image: any;

  @Allow()
  cover_image: any;
}
