import { Business } from 'src/business/entities/business.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ConnectionType } from '../connection-type/connection-type.entity';
import { truncate } from 'fs/promises';
@Entity()
export class Connection extends BaseEntity {
  @Column({ nullable: false })
  connection_type_id: number;

  @Column({ nullable: false })
  user1_id: number;

  @Column({ nullable: true })
  user2_id: number;

  @Column({ nullable: false })
  business_id: number;

  @ManyToOne((type) => User, (user1) => user1.id, {
    eager: false,
  })
  user1: User;

  @ManyToOne((type) => User, (user2) => user2.id, {
    eager: false,
  })
  user2: User;

  @ManyToOne((type) => Business, (business) => business.id, {
    eager: false,
  })
  business: Business;

  @ManyToOne(
    (type) => ConnectionType,
    (connection_type) => connection_type.id,
    {
      eager: false,
    },
  )
  connection_type: ConnectionType;
}
