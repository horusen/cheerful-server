import { IsNotEmpty, IsIn } from 'class-validator';
import { ConnectionTypeEnum } from 'src/connection/connection-type/connection-type.enum';
import { IsRequiredIf } from 'src/shared/validators/is-required-if.validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsIn([ConnectionTypeEnum.UserToUser, ConnectionTypeEnum.BusinessToUser])
  connection_type_id: number;

  @IsRequiredIf('connection_type_id', ConnectionTypeEnum.UserToUser)
  sender_user_id: number;

  @IsRequiredIf('connection_type_id', ConnectionTypeEnum.BusinessToUser)
  sender_business_id: number;

  @IsNotEmpty()
  receiver_email_address: string;

  @IsNotEmpty()
  receiver_name: string;
}
