import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { BaseService } from 'src/shared/services/base.service';
import { State } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StateService extends BaseService<State> {
  constructor(
    @InjectRepository(State)
    private readonly _repo: Repository<State>,
  ) {
    super(_repo);
  }

  findByCountryId(countryId: number) {
    return this._repo.find({ where: { country_id: countryId } });
  }
}
