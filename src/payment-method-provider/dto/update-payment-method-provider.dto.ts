import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodProviderDto } from './create-payment-method-provider.dto';

export class UpdatePaymentMethodProviderDto extends PartialType(
  CreatePaymentMethodProviderDto,
) {}
