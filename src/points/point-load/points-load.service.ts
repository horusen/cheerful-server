import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { PointLoad } from './point-load-history.entity';
import { PointLoadDTO } from './point-load.dto';
import { UsersService } from 'src/users/users.service';
import { BusinessService } from 'src/business/business.service';
import { EntityTypeEnum } from 'src/entity-type/entity-type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PointsLoadService extends BaseService<PointLoad> {
  constructor(
    @InjectRepository(PointLoad)
    private readonly _repo: Repository<PointLoad>,
    public userService: UsersService,
    public businessService: BusinessService,
    public configService: ConfigService,
  ) {
    super(_repo);
  }

  async loadPoints(dto: PointLoadDTO) {
    const isUserEntity = dto.entity_type_id == EntityTypeEnum.User;
    const isBusinessEntity = dto.entity_type_id == EntityTypeEnum.Business;

    if (isUserEntity) {
      await this.userService.updatePointBalance(
        dto.entity_user_id,
        dto.amount * this.configService.get('MONEY_TO_POINT_RATIO'),
      );
    } else if (isBusinessEntity) {
      await this.businessService.updatePointBalance(
        dto.entity_business_id,
        dto.amount * this.configService.get('MONEY_TO_POINT_RATIO'),
      );
    }

    return await this._repo.save({
      ...dto,
      amount: dto.amount * 0.9,
      date: new Date(),
    });
  }

  async getHistoryByUserId(userId: number) {
    return this._repo.find({
      where: {
        entity_user_id: userId,
      },
      order: {
        date: 'DESC',
      },
    });
  }

  async getHistoryByBusinessId(businessId: number) {
    return this._repo.find({
      where: {
        entity_business_id: businessId,
      },
      order: {
        date: 'DESC',
      },
    });
  }
}
