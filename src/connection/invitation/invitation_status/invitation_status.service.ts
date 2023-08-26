import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { InvitationStatus } from './invitation_status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvitationStatusService extends BaseService<InvitationStatus> {
  constructor(
    @InjectRepository(InvitationStatus)
    private readonly _repo: Repository<InvitationStatus>,
  ) {
    super(_repo);
  }
}
