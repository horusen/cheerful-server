import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class FileType extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
