import { Gender } from './entities/gender.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenderSeeder extends BaseSeeder<Gender> {
  constructor(
    @InjectRepository(Gender) public readonly repo: Repository<Gender>,
  ) {
    super(repo, [
      {
        name: 'Male',
      },
      {
        name: 'Female',
      },
      {
        name: 'Other',
      },
    ]);
  }
}
