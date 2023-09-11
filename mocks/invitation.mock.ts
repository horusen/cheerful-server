import { ConnectionTypeEnum } from '../src/connection/connection-type/connection-type.enum';
import { InvitationStatusEnum } from '../src/connection/invitation/invitation_status/invitation_status.enum';

export const mockInvitation = {
  id: 1,
  connection_type_id: ConnectionTypeEnum.BusinessToUser,
  sender_business_id: 1,
  receiver_id: 1,
  status_id: InvitationStatusEnum.Pending,
  date: new Date(),
};
