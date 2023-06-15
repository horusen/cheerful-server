import { Expose } from 'class-transformer';
import { Allow, IsEmail, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { StoreCardService } from '../store-card/store-card.service';

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
  store_online_link: string;

  @Allow()
  store_logo_image: string;

  @Allow()
  store_cover_image: string;

  @IsNotEmpty()
  user_id: number;
}
