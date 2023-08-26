import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BusinessAdmin extends BaseEntity {
  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: true })
  business_id: number;
}
