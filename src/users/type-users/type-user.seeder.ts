import { InjectRepository } from '@nestjs/typeorm';
import { TypeUser } from 'src/users/type-users/entities/type-user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from '../../shared/seeders/base-seeder.interface';

@Injectable()
export class TypeUserSeeder extends BaseSeeder<TypeUser> {
  constructor(
    @InjectRepository(TypeUser) public readonly repo: Repository<TypeUser>,
  ) {
    super(repo, [
      {
        name: 'individual',
        description:
          'User that are not administrator of business or merchant. Example could be employee, partner, customer',
      },
      {
        name: 'business-admin',
        description: 'A user that have created and manage a business',
      },
      {
        name: 'merchant',
      },
    ]);
  }
}
