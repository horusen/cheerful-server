import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class PointTransfered extends BaseEntity {
  @Column({ nullable: false })
  entity_type_id: number;

  @Column()
  user_id: number;

  @Column()
  business_id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;
}
