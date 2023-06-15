import { PartialType } from '@nestjs/mapped-types';
import { CreateStorePaymentMethodDto } from './create-store-payment-method.dto';

export class UpdateStorePaymentMethodDto extends PartialType(CreateStorePaymentMethodDto) {}
