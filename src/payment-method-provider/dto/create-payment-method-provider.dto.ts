import { Allow, IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodProviderDto {
  @IsNotEmpty()
  type_payment_method_provider_id: number;

  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
