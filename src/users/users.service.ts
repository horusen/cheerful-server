import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) public readonly repo: Repository<User>,
    public configService: ConfigService,
  ) {
    super(repo);
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }

  async updatePointBalance(
    userId: number,
    moneyAmount: number,
    increment = true,
  ) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (increment) user.point_balance += moneyAmount;
    else user.point_balance -= moneyAmount;

    return await this.repo.save(user);
  }
}
