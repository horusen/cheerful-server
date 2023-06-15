import { File } from 'src/file-service/file.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  JoinTableOptions,
  ManyToOne,
} from 'typeorm';

@Entity()
export class StoreCard extends BaseEntity {
  @Column({ nullable: true })
  card_image_id: string;

  @Column({ nullable: false })
  store_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  min_price: number;

  @ManyToOne((type) => File, { nullable: true, eager: true })
  @JoinTable({
    joinColumn: 'card_image_id',
    inverseJoinColumn: 'file_id',
    name: 'store_card_file',
    synchronize: false,
  } as JoinTableOptions)
  card_image: File;

  @ManyToOne((type) => Store, (store) => store.id)
  store: Store;
}
