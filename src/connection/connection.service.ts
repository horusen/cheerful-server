import { Connection } from './entities/connection.entity';
import { Injectable } from '@nestjs/common';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { BaseService } from 'src/shared/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectionTypeEnum } from './connection-type/connection-type.enum';

@Injectable()
export class ConnectionService extends BaseService<Connection> {
  constructor(
    @InjectRepository(Connection)
    private readonly _repo: Repository<Connection>,
  ) {
    super(_repo);
  }

  create(createConnectionDto: CreateConnectionDto) {
    let data: CreateConnectionDto = {
      user1_id: createConnectionDto.user1_id,
      connection_type_id: createConnectionDto.connection_type_id,
    };

    if (
      createConnectionDto.connection_type_id ==
      ConnectionTypeEnum.BusinessToUser
    ) {
      data = {
        ...data,
        business_id: createConnectionDto.business_id,
      };
    } else {
      data = {
        ...data,
        user2_id: createConnectionDto.user2_id,
      };
    }

    return this._repo.save(data);
  }
}
