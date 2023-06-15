import { Allow, IsNotEmpty } from 'class-validator';

export class CreateTypePaymentMethodProviderDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
