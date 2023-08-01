import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Currency extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  symbol: string;

  @Column({ nullable: true })
  code: string;
}
