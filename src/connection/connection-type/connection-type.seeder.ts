import { ConnectionType } from './connection-type.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionTypeSeeder extends BaseSeeder<ConnectionType> {
  constructor(
    @InjectRepository(ConnectionType)
    public readonly repo: Repository<ConnectionType>,
  ) {
    super(repo, [
      {
        name: 'User to User',
        description: 'A connection between two users',
      },
      {
        name: 'User to Business',
        description: 'A connection between a user and a business',
      },
    ]);
  }
}
