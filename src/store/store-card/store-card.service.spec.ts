import { Test, TestingModule } from '@nestjs/testing';
import { StoreCardService } from './store-card.service';

describe('StoreCardService', () => {
  let service: StoreCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreCardService],
    }).compile();

    service = module.get<StoreCardService>(StoreCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
