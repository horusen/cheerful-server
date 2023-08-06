import { ConfigService } from '@nestjs/config';
import { User } from './users.entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/shared/email/email.service';
import { BaseService } from 'src/shared/services/base.service';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) public readonly repo: Repository<User>, public configService: ConfigService) {
    super(repo);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async updatePointBalance(userId: number, moneyAmount: number) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.point_balance += moneyAmount * this.configService.get('MONEY_TO_POINT_RATIO');
    return await this.repo.save(user);
  }
}
