import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
