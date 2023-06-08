import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentMethodProviderService } from './payment-method-provider.service';
import { CreatePaymentMethodProviderDto } from './dto/create-payment-method-provider.dto';
import { UpdatePaymentMethodProviderDto } from './dto/update-payment-method-provider.dto';

@Controller('payment-method-provider')
export class PaymentMethodProviderController {
  constructor(
    private readonly PaymentMethodProviderService: PaymentMethodProviderService,
  ) {}

  @Post()
  create(
    @Body() createPaymentMethodProviderDto: CreatePaymentMethodProviderDto,
  ) {
    return this.PaymentMethodProviderService.create(
      createPaymentMethodProviderDto,
    );
  }

  @Get()
  findAll() {
    return this.PaymentMethodProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PaymentMethodProviderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodProviderDto: UpdatePaymentMethodProviderDto,
  ) {
    return this.PaymentMethodProviderService.update(
      +id,
      updatePaymentMethodProviderDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PaymentMethodProviderService.remove(+id);
  }
}
