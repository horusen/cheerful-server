import { Test, TestingModule } from '@nestjs/testing';
import { BusinessIndustryController } from './business_industry.controller';
import { BusinessIndustryService } from './business_industry.service';

describe('BusinessIndustryController', () => {
  let controller: BusinessIndustryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessIndustryController],
      providers: [BusinessIndustryService],
    }).compile();

    controller = module.get<BusinessIndustryController>(BusinessIndustryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
