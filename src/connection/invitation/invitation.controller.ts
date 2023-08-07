import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UsersService } from 'src/users/users.service';
import { BusinessService } from 'src/business/business.service';
import { User } from 'src/users/users.entity';
import { Business } from 'src/business/entities/business.entity';
import { ConnectionTypeEnum } from '../connection-type/connection-type.enum';
import { InvitationStatusEnum } from './invitation_status/invitation_status.enum';

@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    public userService: UsersService,
    public businessService: BusinessService,
  ) {}

  @Get('sender/user/:id')
  async getBySenderUserId(
    @Param('id') id: number,
    @Query('status') status: string,
  ) {
    return await this.invitationService.getBySenderUserId(id, status);
  }

  @Get('sender/business/:id')
  async getBySenderBusinessId(
    @Param('id') id: number,
    @Query('status') status: string,
  ) {
    return await this.invitationService.getBySenderBusinessId(id, status);
  }

  @Get('receiver/:id')
  async getByReceiverId(@Param('id') id: number) {
    return await this.invitationService.getByReceiverId(id);
  }

  /**
   * Creates an invitation based on the provided data.
   *
   * @param createInvitationDto - The data for creating the invitation.
   * @returns The created invitation.
   * @throws Error if the receiver or sender does not exist.
   */
  @Post()
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    let sender: User | Business;

    // Check the connection_type_id in the createInvitationDto
    if (
      createInvitationDto.connection_type_id == ConnectionTypeEnum.UserToUser
    ) {
      // If the connection_type_id is 1, find the sender using userService
      sender = await this.userService.findOne(
        createInvitationDto.sender_user_id,
      );
    } else if (
      createInvitationDto.connection_type_id ==
      ConnectionTypeEnum.BusinessToUser
    ) {
      // If the connection_type_id is 2, find the sender using businessService
      sender = await this.businessService.findOne(
        createInvitationDto.sender_business_id,
      );
    }

    // If the sender does not exist, throw an error
    if (!sender) {
      throw new Error('Sender does not exist');
    }

    // Create the invitation using the createInvitationDto
    return await this.invitationService.create(createInvitationDto);
  }

  @Patch(':id/status/:status')
  async updateStatus(
    @Param('id') id: number,
    @Param('status') status: 'accepted' | 'aborted',
  ) {
    let _status =
      status == 'accepted'
        ? InvitationStatusEnum.Accepted
        : InvitationStatusEnum.Aborted;
    return await this.invitationService.updateInvitationStatus(id, _status);
  }

  /**
   * Updates an invitation.
   *
   * @param {number} id - The ID of the invitation to update.
   * @param {CreateInvitationDto} update - The updated invitation data.
   * @return {Promise<Invitation>} - A promise that resolves to the updated invitation.
   */
  @Patch(':id')
  async update(@Param('id') id: number, update: CreateInvitationDto) {
    return await this.invitationService.update(id, update);
  }
}
