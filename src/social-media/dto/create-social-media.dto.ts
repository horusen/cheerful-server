import { Allow, IsNotEmpty } from 'class-validator';

export class CreateSocialMediaDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
