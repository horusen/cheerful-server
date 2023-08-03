import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Invitation } from './invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectionTypeEnum } from '../connection-type/connection-type.enum';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitationService extends BaseService<Invitation> {
  constructor(
    @InjectRepository(Invitation)
    private readonly _repo: Repository<Invitation>,
    public userService: UsersService,
  ) {
    super(_repo);
  }

  async create(createDTO: CreateInvitationDto) {
    const user = await this.userService.findOrCreateUserByEmail(
      createDTO.receiver_email_address,
    );

    const element = await this.repo.save({
      ...createDTO,
      receiver_id: user.id,
    });

    return this.findOne(element.id);
  }

  getByReceiverId(id: number) {
    return this._repo.find({ where: { receiver_id: id } });
  }

  getBySenderUserId(id: number) {
    return this._repo.find({
      where: {
        connection_type_id: ConnectionTypeEnum.UserToUser,
        sender_user_id: id,
      },
    });
  }

  getBySenderBusinessId(id: number) {
    return this._repo.find({
      where: {
        connection_type_id: ConnectionTypeEnum.BusinessToUser,
        sender_business_id: id,
      },
    });
  }
}
