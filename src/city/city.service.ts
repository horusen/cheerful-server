import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { BaseService } from 'src/shared/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService extends BaseService<City> {
  constructor(
    @InjectRepository(City)
    private readonly _repo: Repository<City>,
  ) {
    super(_repo);
  }

  findByStateId(stateId: number) {
    return this._repo.find({ where: { state_id: stateId } });
  }
}
