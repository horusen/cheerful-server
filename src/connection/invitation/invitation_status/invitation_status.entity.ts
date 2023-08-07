import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';
@Entity()
export class InvitationStatus extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;
}
