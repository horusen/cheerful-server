import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';
@Entity()
export class ConnectionType extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;
}
