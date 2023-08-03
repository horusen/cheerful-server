import { Controller, Get } from '@nestjs/common';
import { InvitationStatusService } from './invitation_status.service';

@Controller('invitation-status')
export class InvitationStatusController {
  constructor(
    private readonly invitationStatusService: InvitationStatusService,
  ) {}

  @Get()
  async findAll() {
    return await this.invitationStatusService.findAll();
  }
}
