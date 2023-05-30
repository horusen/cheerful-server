import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class EntityTimestamp {
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
