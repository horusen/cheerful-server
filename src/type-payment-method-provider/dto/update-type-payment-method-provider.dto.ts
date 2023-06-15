import { PartialType } from '@nestjs/mapped-types';
import { CreateTypePaymentMethodProviderDto } from './create-type-payment-method-provider.dto';

export class UpdateTypePaymentMethodProviderDto extends PartialType(
  CreateTypePaymentMethodProviderDto,
) {}
