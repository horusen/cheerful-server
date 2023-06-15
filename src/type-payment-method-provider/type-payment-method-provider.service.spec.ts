import { Test, TestingModule } from '@nestjs/testing';
import { TypePaymentMethodProviderService } from './type-payment-method-provider.service';

describe('TypePaymentMethodProviderService', () => {
  let service: TypePaymentMethodProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypePaymentMethodProviderService],
    }).compile();

    service = module.get<TypePaymentMethodProviderService>(
      TypePaymentMethodProviderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
