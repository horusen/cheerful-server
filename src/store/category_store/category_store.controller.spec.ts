import { Test, TestingModule } from '@nestjs/testing';
import { CategoryStoreController } from './category_store.controller';
import { CategoryStoreService } from './category_store.service';

describe('CategoryStoreController', () => {
  let controller: CategoryStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryStoreController],
      providers: [CategoryStoreService],
    }).compile();

    controller = module.get<CategoryStoreController>(CategoryStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
