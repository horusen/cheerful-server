import { Test, TestingModule } from '@nestjs/testing';
import { CategoryStoreService } from './category_store.service';

describe('CategoryStoreService', () => {
  let service: CategoryStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryStoreService],
    }).compile();

    service = module.get<CategoryStoreService>(CategoryStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
