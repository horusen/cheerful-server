import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypePaymentMethodProviderService } from './type-payment-method-provider.service';
import { CreateTypePaymentMethodProviderDto } from './dto/create-type-payment-method-provider.dto';
import { UpdateTypePaymentMethodProviderDto } from './dto/update-type-payment-method-provider.dto';

@Controller('type-payment-method-provider')
export class TypePaymentMethodProviderController {
  constructor(
    private readonly typePaymentMethodProviderService: TypePaymentMethodProviderService,
  ) {}

  @Post()
  create(
    @Body()
    createTypePaymentMethodProviderDto: CreateTypePaymentMethodProviderDto,
  ) {
    return this.typePaymentMethodProviderService.create(
      createTypePaymentMethodProviderDto,
    );
  }

  @Get()
  findAll() {
    return this.typePaymentMethodProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typePaymentMethodProviderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTypePaymentMethodProviderDto: UpdateTypePaymentMethodProviderDto,
  ) {
    return this.typePaymentMethodProviderService.update(
      +id,
      updateTypePaymentMethodProviderDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typePaymentMethodProviderService.remove(+id);
  }
}
