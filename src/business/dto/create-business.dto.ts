import { Allow, IsNotEmpty } from 'class-validator';

export class CreateBusinessDto {
  // TODO: Add validation IsExisting
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email_address: string;

  @IsNotEmpty()
  type_business_id: number;

  @IsNotEmpty()
  industry_id: number;

  @Allow()
  description: number;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  currency_id: number;

  @Allow()
  business_logo: string;
}
