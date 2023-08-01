import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileType } from './file_type/entities/file_type.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
export class File {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  key: string;

  @Column()
  file_type_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // @ManyToOne((type) => FileType, (file_type) => file_type.id, {
  //   eager: false,
  // })
  // file_type: FileType;
}
