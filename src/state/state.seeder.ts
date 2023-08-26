import { State } from 'src/state/entities/state.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StateSeeder extends BaseSeeder<State> {
  constructor(
    @InjectRepository(State) public readonly repo: Repository<State>,
  ) {
    super(repo, [
      {
        name: 'Abuja',
        country_id: 1,
      },
      {
        name: 'Lagos',
        country_id: 1,
      },
      {
        name: 'Kaduna',
        country_id: 1,
      },
      {
        name: 'Greater Accra',
        country_id: 2,
      },
      {
        name: 'Eastern Region',
        country_id: 2,
      },
      {
        name: 'Kumasi',
        country_id: 2,
      },
      {
        name: 'Dakar',
        country_id: 3,
      },
      {
        name: 'Saint Louis',
        country_id: 3,
      },
    ]);
  }
}
