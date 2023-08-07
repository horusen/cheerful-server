import { Test, TestingModule } from '@nestjs/testing';
import { PointTransfertService } from './point-transfert.service';

describe('PointTransfertService', () => {
  let service: PointTransfertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointTransfertService],
    }).compile();

    service = module.get<PointTransfertService>(PointTransfertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
