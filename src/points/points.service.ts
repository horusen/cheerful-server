import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { PointLoadHistory } from './point-load-history.entity';
import { LoadPointDTO } from './dto/load-point.dto';
import { UsersService } from 'src/users/users.service';
import { BusinessService } from 'src/business/business.service';
import { EntityTypeEnum } from 'src/entity-type/entity-type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PointsService extends BaseService<PointLoadHistory> {
  constructor(
    @InjectRepository(PointLoadHistory)
    private readonly _repo: Repository<PointLoadHistory>,
    public userService: UsersService,
    public businessService: BusinessService,
    public configService: ConfigService,
  ) {
    super(_repo);
  }

  async loadPoints(dto: LoadPointDTO) {
    const isUserEntity = dto.entity_type_id == EntityTypeEnum.User;
    const isBusinessEntity = dto.entity_type_id == EntityTypeEnum.Business;

    if (isUserEntity) {
      await this.userService.updatePointBalance(dto.entity_user_id, dto.amount);
    } else if (isBusinessEntity) {
      await this.businessService.updatePointBalance(
        dto.entity_business_id,
        dto.amount,
      );
    }

    return await this._repo.save({ ...dto, date: new Date() });
  }
}
