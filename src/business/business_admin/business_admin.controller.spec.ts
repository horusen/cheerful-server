import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAdminController } from './business_admin.controller';
import { BusinessAdminService } from './business_admin.service';

describe('BusinessAdminController', () => {
  let controller: BusinessAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessAdminController],
      providers: [BusinessAdminService],
    }).compile();

    controller = module.get<BusinessAdminController>(BusinessAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
