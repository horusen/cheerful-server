import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';

/**
 * Record the total amount of point that an enetity has sent to another
 * Ex: Over the course theirs lifetime, Business A has sent 10,000 points to Business B over multiple transactions
 */

@Entity()
export class PointExchange extends BaseEntity {
  @Column({ nullable: false })
  sender_entity_type_id: number;

  @Column({ nullable: true })
  sender_user_id: number;

  @Column({ nullable: true })
  sender_business_id: number;

  @Column({ nullable: false })
  receiver_id: number;

  @Column({ type: 'double' })
  total_amount: number;
}
