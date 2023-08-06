import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';
@Entity()
export class PointLoadHistory extends BaseEntity {
  @Column({ nullable: false })
  entity_type_id: number;

  @Column()
  entity_user_id: number;

  @Column()
  entity_business_id: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  amount: number;
}
