import { TypeUsersModule } from 'src/users/type-users/type-users.module';
import { Seeder } from './seed';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeUsersModule],
  controllers: [],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule {}
