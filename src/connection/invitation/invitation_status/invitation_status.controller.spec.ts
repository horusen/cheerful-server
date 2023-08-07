import { Test, TestingModule } from '@nestjs/testing';
import { InvitationStatusController } from './invitation_status.controller';
import { InvitationStatusService } from './invitation_status.service';

describe('InvitationStatusController', () => {
  let controller: InvitationStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitationStatusController],
      providers: [InvitationStatusService],
    }).compile();

    controller = module.get<InvitationStatusController>(InvitationStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
