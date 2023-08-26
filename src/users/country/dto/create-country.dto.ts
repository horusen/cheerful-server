import { Allow, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  flag: string;

  @Allow()
  currency: string;
}
