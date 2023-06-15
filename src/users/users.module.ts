import { User } from './users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { TypeUsersModule } from './type-users/type-users.module';
import { GenderModule } from './gender/gender.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeUsersModule, GenderModule, CountryModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
