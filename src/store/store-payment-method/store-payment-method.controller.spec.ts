import { Test, TestingModule } from '@nestjs/testing';
import { StorePaymentMethodController } from './store-payment-method.controller';
import { StorePaymentMethodService } from './store-payment-method.service';

describe('StorePaymentMethodController', () => {
  let controller: StorePaymentMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorePaymentMethodController],
      providers: [StorePaymentMethodService],
    }).compile();

    controller = module.get<StorePaymentMethodController>(StorePaymentMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
