import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MessagingModule } from 'src/shared/messaging/messaging.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FileModule } from 'src/file-service/file.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    MessagingModule,
    TypeOrmModule.forFeature([Order]),
    FileModule,
    StoreModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
