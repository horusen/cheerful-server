import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoadPointDTO } from './dto/load-point.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(public pointService: PointsService) {}

  @Post('load')
  async loadPoints(@Body() dto: LoadPointDTO) {
    return this.pointService.loadPoints(dto);
  }

  @Get('user/:userId')
  async getHistoryByUserId(@Param('userId') userId: number) {
    return this.pointService.getHistoryByUserId(userId);
  }

  @Get('business/:businessId')
  async getHistoryByBusinessId(@Param('businessId') businessId: number) {
    return this.pointService.getHistoryByBusinessId(businessId);
  }
}
