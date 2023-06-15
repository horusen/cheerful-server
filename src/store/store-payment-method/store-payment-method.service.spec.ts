import { Test, TestingModule } from '@nestjs/testing';
import { StorePaymentMethodService } from './store-payment-method.service';

describe('StorePaymentMethodService', () => {
  let service: StorePaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorePaymentMethodService],
    }).compile();

    service = module.get<StorePaymentMethodService>(StorePaymentMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
