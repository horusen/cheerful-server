import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  SelectQueryBuilder,
  CreateDateColumn,
} from 'typeorm';
import { ConnectionType } from '../connection-type/connection-type.entity';
import { User } from 'src/users/users.entity';
import { Business } from 'src/business/entities/business.entity';
import { InvitationStatusEnum } from './invitation_status/invitation_status.enum';
import { InvitationStatus } from './invitation_status/invitation_status.entity';
import { Exclude, Expose } from 'class-transformer';

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

  @Column({ nullable: false, default: false })
  read: boolean;

  @Column({ nullable: false, default: InvitationStatusEnum.Pending })
  status_id: number;

  @CreateDateColumn({ name: 'date', nullable: false })
  date: Date;

  @ManyToOne((type) => User, (receiver) => receiver.id, {
    eager: true,
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

  @Exclude()
  @ManyToOne((type) => InvitationStatus, (status) => status.id, {
    eager: true,
  })
  @JoinColumn({ name: 'status_id' })
  _status: InvitationStatus;

  @ManyToOne((type) => User, (sender) => sender.id, {
    eager: true,
  })
  sender_user: User;

  @ManyToOne((type) => Business, (sender) => sender.id, {
    eager: true,
  })
  sender_business: Business;

  @Expose()
  get status() {
    return this._status.name;
  }
}
