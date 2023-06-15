import { Allow, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  currency: string;
}
