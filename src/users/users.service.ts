import { User } from './users.entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) public readonly repo: Repository<User>) {
    super(repo);
  }

  find(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
