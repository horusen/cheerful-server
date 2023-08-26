import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PointLoadDTO } from './point-load/point-load.dto';
import { PointsLoadService } from './point-load/points-load.service';
import { PointTransfertDTO } from './point-transfert/point-transfert.dto';
import { PointTransfertService } from './point-transfert/point-transfert.service';

@Controller('points')
export class PointsController {
  constructor(
    public pointLoadService: PointsLoadService,
    public pointTransfertService: PointTransfertService,
  ) {}

  @Post('load')
  async loadPoints(@Body() dto: PointLoadDTO) {
    return this.pointLoadService.loadPoints(dto);
  }

  @Get('/load/user/:userId')
  async getHistoryByUserId(@Param('userId') userId: number) {
    return this.pointLoadService.getHistoryByUserId(userId);
  }

  @Get('/load/business/:businessId')
  async getHistoryByBusinessId(@Param('businessId') businessId: number) {
    return this.pointLoadService.getHistoryByBusinessId(businessId);
  }

  @Post('transfert')
  async transfertPoint(@Body() dto: PointTransfertDTO) {
    return await this.pointTransfertService.store(dto);
  }

  @Get('transfert/business/:businessId')
  async getTransfertByBusinessId(@Param('businessId') businessId: number) {
    return await this.pointTransfertService.getByBusiness(businessId);
  }

  @Get('transfert/user/:userId')
  async getTransfertByUserId(@Param('userId') userId: number) {
    return await this.pointTransfertService.getByUser(userId);
  }
}
