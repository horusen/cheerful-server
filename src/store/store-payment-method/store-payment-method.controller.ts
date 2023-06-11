import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StorePaymentMethodService } from './store-payment-method.service';
import { CreateStorePaymentMethodDto } from './dto/create-store-payment-method.dto';
import { UpdateStorePaymentMethodDto } from './dto/update-store-payment-method.dto';

@Controller('store-payment-method')
export class StorePaymentMethodController {
  constructor(
    private readonly storePaymentMethodService: StorePaymentMethodService,
  ) {}

  @Post()
  create(@Body() createStorePaymentMethodDto: CreateStorePaymentMethodDto) {
    return this.storePaymentMethodService.create(createStorePaymentMethodDto);
  }

  @Get('store/:id')
  findByStoreId(@Param('id') id: string) {
    return this.storePaymentMethodService.findByStoreId(+id);
  }

  @Get()
  findAll() {
    return this.storePaymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storePaymentMethodService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStorePaymentMethodDto: UpdateStorePaymentMethodDto,
  ) {
    return this.storePaymentMethodService.update(
      +id,
      updateStorePaymentMethodDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storePaymentMethodService.remove(+id);
  }
}
