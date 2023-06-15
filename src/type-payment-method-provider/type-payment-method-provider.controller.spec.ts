import { Test, TestingModule } from '@nestjs/testing';
import { TypePaymentMethodProviderController } from './type-payment-method-provider.controller';
import { TypePaymentMethodProviderService } from './type-payment-method-provider.service';

describe('TypePaymentMethodProviderController', () => {
  let controller: TypePaymentMethodProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypePaymentMethodProviderController],
      providers: [TypePaymentMethodProviderService],
    }).compile();

    controller = module.get<TypePaymentMethodProviderController>(
      TypePaymentMethodProviderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
