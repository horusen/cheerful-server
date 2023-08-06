import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get('user/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.connectionService.getByUser(userId);
  }

  @Get('business/:businessId')
  getByBusiness(@Param('businessId') businessId: number) {
    return this.connectionService.getByBusiness(businessId);
  }
}
