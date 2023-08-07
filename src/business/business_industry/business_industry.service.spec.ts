import { Test, TestingModule } from '@nestjs/testing';
import { BusinessIndustryService } from './business_industry.service';

describe('BusinessIndustryService', () => {
  let service: BusinessIndustryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessIndustryService],
    }).compile();

    service = module.get<BusinessIndustryService>(BusinessIndustryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
