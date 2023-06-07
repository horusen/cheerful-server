import { Test, TestingModule } from '@nestjs/testing';
import { TypeStoreController } from './type-store.controller';
import { TypeStoreService } from './type-store.service';

describe('TypeStoreController', () => {
  let controller: TypeStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeStoreController],
      providers: [TypeStoreService],
    }).compile();

    controller = module.get<TypeStoreController>(TypeStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
