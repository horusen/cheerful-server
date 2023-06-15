import { Test, TestingModule } from '@nestjs/testing';
import { StoreSocialMediaService } from './store_social_media.service';

describe('StoreSocialMediaService', () => {
  let service: StoreSocialMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreSocialMediaService],
    }).compile();

    service = module.get<StoreSocialMediaService>(StoreSocialMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
