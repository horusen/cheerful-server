import { Module, forwardRef } from '@nestjs/common';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BusinessModule } from 'src/business/business.module';
import { PointTransfertService } from './point-transfert/point-transfert.service';
import { PointExchangedService } from './point-exchanged/point-exchanged.service';
import { PointLoad } from './point-load/point-load-history.entity';
import { PointsLoadService } from './point-load/points-load.service';
import { PointTransfert } from './point-transfert/point-transfert.entity';
import { PointExchange } from './point-exchanged/point-exchanged.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointLoad, PointTransfert, PointExchange]),
    UsersModule,
    BusinessModule,
  ],
  controllers: [PointsController],
  providers: [PointsLoadService, PointTransfertService, PointExchangedService],
  exports: [PointTransfertService],
})
export class PointsModule {}
