import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  constructor() {}

  onModuleInit() {}
}
