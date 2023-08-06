import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityType } from './entity-type.entity';

@Injectable()
export class EntityTypeSeeder extends BaseSeeder<EntityType> {
  constructor(
    @InjectRepository(EntityType) public readonly repo: Repository<EntityType>,
  ) {
    super(repo, [
      {
        name: 'User',
        description: 'User ',
      },
      {
        name: 'Business',
        description: 'Business ',
      },
    ]);
  }
}
