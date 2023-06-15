import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class StoreFile {
  @PrimaryColumn()
  store_id: number;

  @PrimaryColumn()
  file_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
