import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @Column({ nullable: false })
  state_id: number;

  @Column({ nullable: false })
  name: string;
}
