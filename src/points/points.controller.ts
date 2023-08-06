import { Body, Controller, Post } from '@nestjs/common';
import { LoadPointDTO } from './dto/load-point.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(public pointService: PointsService) {}

  @Post('load')
  async loadPoints(@Body() dto: LoadPointDTO) {
    return this.pointService.loadPoints(dto);
  }
}
