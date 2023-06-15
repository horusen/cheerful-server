import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService } from 'src/shared/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { MessagingService } from 'src/shared/messaging/messaging.service';
import { FileServiceService } from 'src/file-service/file-service.service';
import { File } from 'src/file-service/file.entity';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly _repo: Repository<Order>,
    public messagingService: MessagingService,
    public fileService: FileServiceService,
    public storeService: StoreService,
  ) {
    super(_repo);
  }

  async processOrder(dto: CreateOrderDto, attachment: Express.Multer.File) {
    const store = await this.storeService.findOne(dto.store_id);

    // store the media
    let image: File;
    if (attachment) {
      image = await this.fileService.uploadFile(
        attachment.buffer,
        attachment.originalname,
      );
    }
    // send the message
    this.messagingService.sendWhatsappMediaMessage(image.url);
    this.messagingService.sendWhatsappMediaMessage(
      store.card.card_image.url,
      `Hooray ${dto.recipient_name}, you got a gift card from ${store.name} worth of ${dto.amount}!`,
    );

    return store;
  }
}
