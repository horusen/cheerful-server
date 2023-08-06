import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointLoadHistory } from './point-load-history.entity';
import { UsersModule } from 'src/users/users.module';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointLoadHistory]),
    UsersModule,
    BusinessModule,
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
