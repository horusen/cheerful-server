import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Country extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  currency: string;
}
