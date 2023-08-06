import { HttpException, Injectable } from '@nestjs/common';
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
import { InvitationStatusEnum } from './invitation_status/invitation_status.enum';
import { ConnectionService } from '../connection.service';
import { User } from 'src/users/users.entity';
import { SessionService } from 'src/session/session.service';
import { CreateConnectionDto } from '../dto/create-connection.dto';

@Injectable()
export class InvitationService extends BaseService<Invitation> {
  constructor(
    @InjectRepository(Invitation)
    private readonly _repo: Repository<Invitation>,
    public userService: UsersService,
    public emailService: EmailService,
    public businessService: BusinessService,
    public sessionService: SessionService,
    public connectionService: ConnectionService,
  ) {
    super(_repo);
  }

  async create(createDTO: CreateInvitationDto) {
    let invitation: Invitation;

    const receiver = await this.findOrCreateReceiver(createDTO);

    invitation = await this.saveInvitation(createDTO, receiver);

    await this.sendInvitationEmail(createDTO, invitation);

    return this.findOne(invitation.id);
  }

  private async findOrCreateReceiver(createDTO: CreateInvitationDto) {
    let receiver = await this.userService.findByEmail(
      createDTO.receiver_email_address,
    );

    if (!receiver) {
      receiver = await this.userService.create({
        name: createDTO.receiver_name,
        email: createDTO.receiver_email_address,
        type_user_id: TypeUserEnum.Individual,
      });
    }

    return receiver;
  }

  private async saveInvitation(createDTO: CreateInvitationDto, receiver: User) {
    const invitation = await this.repo.save({
      ...createDTO,
      receiver_id: receiver.id,
    });

    return invitation;
  }

  private async sendInvitationEmail(
    createDTO: CreateInvitationDto,
    invitation: Invitation,
  ) {
    const sender =
      createDTO.connection_type_id == ConnectionTypeEnum.UserToUser
        ? await this.userService.findOne(createDTO.sender_user_id)
        : await this.businessService.findOne(createDTO.sender_business_id);

    this.emailService.sendInvitationtionEmail(
      sender,
      createDTO.receiver_name,
      createDTO.receiver_email_address,
      invitation.id,
    );
  }

  async updateInvitationStatus(
    invitationId: number,
    status: InvitationStatusEnum,
  ) {
    if (status == InvitationStatusEnum.Accepted) {
      await this._accetpInvitation(invitationId);
    } else {
      await this._abortInvitation(invitationId);
    }
  }

  private async _accetpInvitation(invitationId: number) {
    let invitation = await this.repo.findOne({ where: { id: invitationId } });
    if (!invitation) throw new HttpException('Invitation not found', 404);

    invitation.status_id = InvitationStatusEnum.Accepted;
    invitation = await this._repo.save(invitation);

    await this.createConnection(invitation);

    return invitation;
  }

  private async _abortInvitation(invitationId: number) {
    let invitation = await this.repo.findOne({ where: { id: invitationId } });
    if (!invitation) throw new HttpException('Invitation not found', 404);

    // Check if the connection type is UserToUser
    const isUserToUserConnection =
      invitation.connection_type_id === ConnectionTypeEnum.UserToUser;

    // Check if the connection type is BusinessToUser
    const isBusinessToUserConnection =
      invitation.connection_type_id === ConnectionTypeEnum.BusinessToUser;

    // Check if the current user is the sender in UserToUser connection
    const isCurrentUserSender =
      isUserToUserConnection &&
      this.sessionService.userId !== invitation.sender_user_id;

    // Check if the current business is the sender in BusinessToUser connection
    const isCurrentBusinessSender =
      isBusinessToUserConnection &&
      this.sessionService.businessId !== invitation.sender_business_id;

    // If the current user or business is the sender, update the status of the invitation
    if (!isCurrentUserSender || !isCurrentBusinessSender)
      throw new HttpException('You are not the sender of this invitation', 400);
    this.update(invitationId, { status_id: InvitationStatusEnum.Aborted });
  }

  async createConnection(invitation: Invitation) {
    const {
      connection_type_id,
      receiver_id,
      sender_user_id,
      sender_business_id,
    } = invitation;

    const connection: CreateConnectionDto = {
      connection_type_id,
      user1_id: receiver_id,
    };

    if (connection_type_id === ConnectionTypeEnum.UserToUser) {
      connection['user2_id'] = sender_user_id;
    } else {
      connection['business_id'] = sender_business_id;
    }

    return this.connectionService.create(connection);
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
