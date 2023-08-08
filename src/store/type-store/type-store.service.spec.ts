import { Test, TestingModule } from '@nestjs/testing';
import { TypeStoreService } from './type-store.service';

describe('TypeStoreService', () => {
  let service: TypeStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeStoreService],
    }).compile();

    service = module.get<TypeStoreService>(TypeStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
