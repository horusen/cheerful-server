import { InvitationStatus } from './invitation_status.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvitationStatusSeeder extends BaseSeeder<InvitationStatus> {
  constructor(
    @InjectRepository(InvitationStatus)
    public readonly repo: Repository<InvitationStatus>,
  ) {
    super(repo, [
      {
        name: 'Pending',
        description: 'Pending invitation',
      },
      {
        name: 'Accepted',
        description: 'Accepted invitation',
      },
      {
        name: 'Aborted',
        description: 'Aborted invitation',
      },
    ]);
  }
}
