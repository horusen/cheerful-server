import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class State extends BaseEntity {
  @Column({ nullable: false })
  country_id: number;

  @Column({ nullable: false })
  name: string;
}
