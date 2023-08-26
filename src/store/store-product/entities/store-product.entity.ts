import { File } from 'src/file/file.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  JoinTableOptions,
  ManyToOne,
} from 'typeorm';

@Entity('store_product')
export class StoreProduct extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: string;

  @Column({ nullable: false })
  store_id: number;

  @Column({ nullable: false })
  image_id: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => File, { nullable: false, eager: true })
  image: File | File[];
}
