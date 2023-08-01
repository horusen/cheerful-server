import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column } from 'typeorm';

export class FileType extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
