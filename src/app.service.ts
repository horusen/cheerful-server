import { Injectable, OnModuleInit } from '@nestjs/common';
import { Seeder } from './shared/seeders/seed';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(public seeder: Seeder, public configService: ConfigService) {}

  onModuleInit() {
    this.seeder.seed();

    // console.log(decryptedQueryParams);
  }
}
