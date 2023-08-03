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
import { Exclude } from 'class-transformer';

@Entity()
export class File {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  url: string;

  @Column()
  file_type_id: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // @ManyToOne((type) => FileType, (file_type) => file_type.id, {
  //   eager: false,
  // })
  // file_type: FileType;
}
