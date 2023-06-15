import { IsNotEmpty } from 'class-validator';
export class CreateStateDto {
  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  name: string;
}
