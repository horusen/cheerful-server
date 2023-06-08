import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodProviderService } from './payment-method-provider.service';

describe('PaymentMethodProviderService', () => {
  let service: PaymentMethodProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodProviderService],
    }).compile();

    service = module.get<PaymentMethodProviderService>(
      PaymentMethodProviderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
