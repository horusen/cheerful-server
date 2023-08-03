import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ConnectionType } from '../connection-type/connection-type.entity';
import { User } from 'src/users/users.entity';
import { Business } from 'src/business/entities/business.entity';
import { InvitationStatusEnum } from './invitation_status/invitation_status.enum';
@Entity()
export class Invitation extends BaseEntity {
  @Column({ nullable: false })
  connection_type_id: number;

  @Column({ nullable: true })
  sender_business_id: number;

  @Column({ nullable: true })
  sender_user_id: number;

  @Column({ nullable: false })
  receiver_id: number;

  @Column({ nullable: false, default: InvitationStatusEnum.Pending })
  status_id: number;

  @ManyToOne((type) => User, (receiver) => receiver.id, {
    eager: false,
  })
  receiver: User;

  @ManyToOne(
    (type) => ConnectionType,
    (connection_type) => connection_type.id,
    {
      eager: false,
    },
  )
  connection_type: ConnectionType;

  @ManyToOne((type) => User, (sender) => sender.id, {
    eager: false,
  })
  sender_user: User;

  @ManyToOne((type) => Business, (sender) => sender.id, {
    eager: false,
  })
  sender_business: Business;
}
