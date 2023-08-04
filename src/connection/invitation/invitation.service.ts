import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Invitation } from './invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ConnectionTypeEnum } from '../connection-type/connection-type.enum';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/shared/email/email.service';
import { BusinessService } from 'src/business/business.service';
import { TypeUserEnum } from 'src/users/type-users/type-user.enum';
import { AuthService } from 'src/auth/auth.service';
import { InvitationStatusEnum } from './invitation_status/invitation_status.enum';
import { ConnectionService } from '../connection.service';

@Injectable()
export class InvitationService extends BaseService<Invitation> {
  constructor(
    @InjectRepository(Invitation)
    private readonly _repo: Repository<Invitation>,
    public userService: UsersService,
    public emailService: EmailService,
    public businessService: BusinessService,
    public authService: AuthService,
    public connectionService: ConnectionService,
  ) {
    super(_repo);
  }

  async create(createDTO: CreateInvitationDto) {
    let receiver = await this.userService.findByEmail(
      createDTO.receiver_email_address,
    );

    if (!receiver) {
      receiver = await this.userService.create({
        name: createDTO.receiver_name,
        email: createDTO.receiver_email_address,
        type_user_id: TypeUserEnum.Individual,
      });

      let sender =
        createDTO.connection_type_id == ConnectionTypeEnum.UserToUser
          ? await this.userService.findOne(createDTO.sender_user_id)
          : await this.businessService.findOne(createDTO.sender_business_id);

      this.emailService.sendInvitationtionEmail(
        sender,
        createDTO.receiver_name,
        createDTO.receiver_email_address,
      );
    }

    const element = await this.repo.save({
      ...createDTO,
      receiver_id: receiver.id,
    });

    return this.findOne(element.id);
  }

  async updateInvitationStatus(
    invitationId: number,
    status: InvitationStatusEnum,
  ) {
    // Find the invitation by ID
    const invitation = await this.findOne(invitationId);

    // Check if the connection type is UserToUser
    const isUserToUserConnection =
      invitation.connection_type_id === ConnectionTypeEnum.UserToUser;

    // Check if the connection type is BusinessToUser
    const isBusinessToUserConnection =
      invitation.connection_type_id === ConnectionTypeEnum.BusinessToUser;

    // Check if the current user is the sender in UserToUser connection
    const isCurrentUserSender =
      isUserToUserConnection &&
      this.authService.userId !== invitation.sender_user_id;

    // Check if the current business is the sender in BusinessToUser connection
    const isCurrentBusinessSender =
      isBusinessToUserConnection &&
      this.authService.businessId !== invitation.sender_business_id;

    // If the current user or business is the sender, update the status of the invitation
    if (isCurrentUserSender || isCurrentBusinessSender) {
      this.update(invitationId, { status_id: status });
      if (status === InvitationStatusEnum.Accepted) {
        this.createConnection(invitation);
      }
    }
  }

  async createConnection(invitation: Invitation) {
    const {
      connection_type_id,
      receiver_id,
      sender_user_id,
      sender_business_id,
    } = invitation;

    const connection = {
      connection_type_id,
      user1: receiver_id,
    };

    if (connection_type_id === ConnectionTypeEnum.UserToUser) {
      connection['user2'] = sender_user_id;
    } else {
      connection['business'] = sender_business_id;
    }

    return await this.connectionService.create(connection);
  }

  getByReceiverId(id: number) {
    return this._repo.find({
      where: { receiver_id: id, status_id: Not(InvitationStatusEnum.Aborted) },
    });
  }

  getBySenderUserId(id: number, status: string) {
    return this._repo.find({
      where: {
        connection_type_id: ConnectionTypeEnum.UserToUser,
        sender_user_id: id,
        status_id: +status,
      },
    });
  }

  getBySenderBusinessId(id: number, status: string) {
    return this._repo.find({
      where: {
        connection_type_id: ConnectionTypeEnum.BusinessToUser,
        sender_business_id: id,
        status_id: +status,
      },
    });
  }
}
