import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: true })
  business_id: string;
}
