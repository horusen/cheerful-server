import { TypeUserSeeder } from '../../users/type-users/type-user.seeder';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Seeder {
  constructor(public typeUserSeeder: TypeUserSeeder) {}

  async seed() {
    await this.typeUserSeeder.seed();
  }
}
