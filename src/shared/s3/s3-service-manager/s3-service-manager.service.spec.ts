import { Test, TestingModule } from '@nestjs/testing';
import { S3ServiceManagerService } from './s3-service-manager.service';

describe('S3ServiceManagerService', () => {
  let service: S3ServiceManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ServiceManagerService],
    }).compile();

    service = module.get<S3ServiceManagerService>(S3ServiceManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
