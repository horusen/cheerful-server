import { Controller } from '@nestjs/common';
import { ConnectionTypeService } from './connection-type.service';

@Controller('connection-type')
export class ConnectionTypeController {
  constructor(private readonly connectionTypeService: ConnectionTypeService) {}
}
