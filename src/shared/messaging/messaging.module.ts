import { MessagingService } from './messaging.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
