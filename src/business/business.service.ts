import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BaseService } from 'src/shared/services/base.service';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(
    @InjectRepository(Business) private readonly _repo: Repository<Business>,
  ) {
    super(_repo);
  }

  async findByCreatorId(creator_id: number) {
    return await this._repo.findOne({
      where: {
        creator_id,
      },
    });
  }
}
