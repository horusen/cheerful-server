import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodProviderController } from './payment-method-provider.controller';
import { PaymentMethodProviderService } from './payment-method-provider.service';

describe('PaymentMethodProviderController', () => {
  let controller: PaymentMethodProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodProviderController],
      providers: [PaymentMethodProviderService],
    }).compile();

    controller = module.get<PaymentMethodProviderController>(
      PaymentMethodProviderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
