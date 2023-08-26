import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTypeService } from './business_type.service';
import { BaseService } from 'src/shared/services/base.service';

describe('BusinessTypeService', () => {
  let service: BusinessTypeService;
  // create a fake base service
  const fakeBaseService = {
    create: jest.fn((dto) => {
      return { id: 1, ...dto };
    }),
    findAll: jest.fn(() => {
      return [{ id: 1 }];
    }),
    findOne: jest.fn((id) => {
      return { id };
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
    remove: jest.fn((id) => {
      return { id };
    }),
    findFirst: jest.fn(() => {
      return { id: 1 };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessTypeService,
        {
          provide: BaseService,
          useValue: fakeBaseService,
        },
      ],
    }).compile();

    service = module.get<BusinessTypeService>(BusinessTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
