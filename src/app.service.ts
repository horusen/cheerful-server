import { Injectable, OnModuleInit } from '@nestjs/common';
import { Seeder } from './shared/seeders/seed';

@Injectable()
export class AppService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(public seeder: Seeder) {}

  onModuleInit() {
    this.seeder.seed();
  }
}
