import { Module } from '@nestjs/common';
import { TypeUsersService } from './type-users.service';
import { TypeUsersController } from './type-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUser } from './entities/type-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUser])],
  controllers: [TypeUsersController],
  providers: [TypeUsersService],
})
export class TypeUsersModule {}
