import { Allow, IsEmail, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  category_store_id: number;

  @IsNotEmpty()
  @IsInt()
  type_store_id: number;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  store_online_link: string;

  @Allow()
  store_logo_image: string;

  @IsNotEmpty()
  @IsNumber()
  min_card_price: number;
}
