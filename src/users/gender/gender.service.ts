import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenderService extends BaseService<Gender> {
  constructor(
    @InjectRepository(Gender)
    private readonly _repo: Repository<Gender>,
  ) {
    super(_repo);
  }
}
