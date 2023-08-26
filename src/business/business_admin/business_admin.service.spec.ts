import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAdminService } from './business_admin.service';

describe('BusinessAdminService', () => {
  let service: BusinessAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessAdminService],
    }).compile();

    service = module.get<BusinessAdminService>(BusinessAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
