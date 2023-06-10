import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeUser } from './entities/type-user.entity';

@Injectable()
export class TypeUsersService extends BaseService<TypeUser> {
  constructor(
    @InjectRepository(TypeUser)
    private readonly _repo: Repository<TypeUser>,
  ) {
    super(_repo);
  }
}
