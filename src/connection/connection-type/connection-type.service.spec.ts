import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionTypeService } from './connection-type.service';

describe('ConnectionTypeService', () => {
  let service: ConnectionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionTypeService],
    }).compile();

    service = module.get<ConnectionTypeService>(ConnectionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
