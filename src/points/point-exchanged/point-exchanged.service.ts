import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { PointExchange } from './point-exchanged.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointExchangeDTO } from './point-exchange.dto';
import { EntityTypeEnum } from 'src/entity-type/entity-type.enum';

@Injectable()
export class PointExchangedService extends BaseService<PointExchange> {
  constructor(
    @InjectRepository(PointExchange)
    private readonly _repo: Repository<PointExchange>,
  ) {
    super(_repo);
  }

  override async create(data: PointExchangeDTO) {
    const {
      sender_entity_type_id,
      sender_user_id,
      sender_business_id,
      receiver_id,
      amount,
    } = data;

    const condition =
      sender_entity_type_id === EntityTypeEnum.User
        ? { sender_user_id, receiver_id }
        : { sender_business_id, receiver_id };

    const exchange = await this._repo.findOne({ where: condition });

    if (exchange) {
      exchange.total_amount += amount;
      return this._repo.save(exchange);
    } else {
      return this._repo.save({
        sender_entity_type_id,
        sender_user_id,
        sender_business_id,
        receiver_id,
        total_amount: amount,
      });
    }
  }
}
