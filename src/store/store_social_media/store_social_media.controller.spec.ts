import { Test, TestingModule } from '@nestjs/testing';
import { StoreSocialMediaController } from './store_social_media.controller';
import { StoreSocialMediaService } from './store_social_media.service';

describe('StoreSocialMediaController', () => {
  let controller: StoreSocialMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreSocialMediaController],
      providers: [StoreSocialMediaService],
    }).compile();

    controller = module.get<StoreSocialMediaController>(StoreSocialMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
