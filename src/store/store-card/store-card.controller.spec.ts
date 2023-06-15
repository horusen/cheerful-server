import { Test, TestingModule } from '@nestjs/testing';
import { StoreCardController } from './store-card.controller';
import { StoreCardService } from './store-card.service';

describe('StoreCardController', () => {
  let controller: StoreCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreCardController],
      providers: [StoreCardService],
    }).compile();

    controller = module.get<StoreCardController>(StoreCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
