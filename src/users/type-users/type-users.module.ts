import { Module } from '@nestjs/common';
import { TypeUsersService } from './type-users.service';
import { TypeUsersController } from './type-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUser } from './entities/type-user.entity';
import { TypeUserSeeder } from './type-user.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUser])],
  controllers: [TypeUsersController],
  providers: [TypeUsersService, TypeUserSeeder],
  exports: [TypeUsersService, TypeUserSeeder],
})
export class TypeUsersModule {}
