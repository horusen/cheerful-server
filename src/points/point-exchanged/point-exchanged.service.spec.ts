import { Test, TestingModule } from '@nestjs/testing';
import { PointExchangedService } from './point-exchanged.service';

describe('PointExchangedService', () => {
  let service: PointExchangedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointExchangedService],
    }).compile();

    service = module.get<PointExchangedService>(PointExchangedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
