import { IsNotEmpty } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  state_id: number;

  @IsNotEmpty()
  name: string;
}
