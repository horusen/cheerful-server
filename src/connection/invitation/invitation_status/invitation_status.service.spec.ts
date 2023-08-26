import { Test, TestingModule } from '@nestjs/testing';
import { InvitationStatusService } from './invitation_status.service';

describe('InvitationStatusService', () => {
  let service: InvitationStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationStatusService],
    }).compile();

    service = module.get<InvitationStatusService>(InvitationStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
