import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateStoreSocialMediaDto {
  @IsNotEmpty()
  social_media_id: number;

  @IsNotEmpty()
  store_id: number;

  @IsNotEmpty()
  @IsUrl()
  link: string;
}
