import { Test, TestingModule } from '@nestjs/testing';
import { PointsService } from './point-load/points-load.service';

describe('PointsService', () => {
  let service: PointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsService],
    }).compile();

    service = module.get<PointsService>(PointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
