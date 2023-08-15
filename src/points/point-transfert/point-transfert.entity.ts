import { Business } from 'src/business/entities/business.entity';
import { EntityType } from 'src/entity-type/entity-type.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
@Entity()
export class PointTransfert extends BaseEntity {
  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: true })
  sender_user_id: number;

  @Column({ nullable: true })
  sender_business_id: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  sender_entity_type_id: number;

  @Column({ nullable: false })
  receiver_id: number;

  @Column({ nullable: true })
  message: string;

  @ManyToOne(() => EntityType, (entityType) => entityType.id)
  sender_entity_type: EntityType;

  @ManyToOne(() => Business, (business) => business.id, {
    eager: true,
  })
  sender_business: Business;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  sender_user: User;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  receiver: User;
}
