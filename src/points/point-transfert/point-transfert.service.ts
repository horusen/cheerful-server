import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { PointTransfert } from './point-transfert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointTransfertDTO } from './point-transfert.dto';
import { EntityTypeEnum } from 'src/entity-type/entity-type.enum';
import { UsersService } from 'src/users/users.service';
import { BusinessService } from 'src/business/business.service';
import { PointExchangedService } from '../point-exchanged/point-exchanged.service';

@Injectable()
export class PointTransfertService extends BaseService<PointTransfert> {
  constructor(
    @InjectRepository(PointTransfert)
    private readonly _repo: Repository<PointTransfert>,
    public userService: UsersService,
    public businessService: BusinessService,
    public pointExchangeService: PointExchangedService,
  ) {
    super(_repo);
  }

  async store(data: PointTransfertDTO) {
    await this.checkAmount(data);
    return await this.bulkCreate(data);
  }

  async checkAmount(data: PointTransfertDTO) {
    const isSenderUser = data.sender_entity_type_id === EntityTypeEnum.User;
    const isSenderBusiness =
      data.sender_entity_type_id === EntityTypeEnum.Business;

    let balance: number;
    if (isSenderUser) {
      const user = await this.userService.findOne(data.sender_user_id);
      balance = user.point_balance;
    } else if (isSenderBusiness) {
      const business = await this.businessService.findOne(
        data.sender_business_id,
      );
      balance = business.point_balance;
    }

    const totalAmount = data.amount * data.receiver_ids.length;

    if (totalAmount > balance) {
      throw new UnprocessableEntityException('Insufficient balance');
    }
  }

  async updateBalanceUserBalance(data: PointTransfertDTO) {
    this.userService.updatePointBalance(
      data.sender_user_id,
      data.amount,
      false,
    );
    this.userService.updatePointBalance(data.receiver_id, data.amount, true);
  }

  async updateBalanceBusinessBalance(data: PointTransfertDTO) {
    this.businessService.updatePointBalance(
      data.sender_business_id,
      data.amount,
      false,
    );
    this.userService.updatePointBalance(data.receiver_id, data.amount, true);
  }

  private async bulkCreate(data: PointTransfertDTO) {
    const transferts: PointTransfert[] = [];
    for await (const element of data.receiver_ids) {
      const item = await this.create({ ...data, receiver_id: element });
      const returnedItem = await this._repo.findOne({ where: { id: item.id } });
      transferts.push(returnedItem);
    }

    return transferts;
  }

  override async create(data: PointTransfertDTO): Promise<PointTransfert> {
    const item: any = {
      receiver_id: data.receiver_id,
      sender_entity_type_id: data.sender_entity_type_id,
      amount: data.amount,
      date: new Date(),
      message: data.message,
    };

    if (data.sender_entity_type_id === EntityTypeEnum.User) {
      item.sender_user_id = data.sender_user_id;
    } else if (data.sender_entity_type_id === EntityTypeEnum.Business) {
      item.sender_business_id = data.sender_business_id;
    }

    const transfert = await this._repo.save(item);

    if (data.sender_entity_type_id === EntityTypeEnum.User) {
      await this.updateBalanceUserBalance(data);
    } else if (data.sender_entity_type_id === EntityTypeEnum.Business) {
      await this.updateBalanceBusinessBalance(data);
    }

    await this.pointExchangeService.create({
      sender_user_id: data.sender_user_id,
      sender_business_id: data.sender_business_id,
      receiver_id: data.receiver_id,
      sender_entity_type_id: data.sender_entity_type_id,
      amount: data.amount,
    });

    return transfert;
  }

  async getByUser(userId: number) {
    return await this._repo.find({
      where: [{ sender_user_id: userId }, { receiver_id: userId }],
    });
  }

  async getByBusiness(businessId: number) {
    return await this._repo.find({ where: { sender_business_id: businessId } });
  }

  // async findOne(id: number) {
  //   const element = await this.repo.findOne({
  //     where: { id },

  //   });

  //   if (!element) throw new NotFoundException();

  //   return element;
  // }
}
