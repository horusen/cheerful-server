import { IsNotEmpty } from 'class-validator';

export class CreateStorePaymentMethodDto {
  @IsNotEmpty()
  payment_method_provider_id: number;

  @IsNotEmpty()
  account_number: string;

  @IsNotEmpty()
  store_id: number;
}
