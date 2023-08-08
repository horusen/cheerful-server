import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  JoinTableOptions,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryStore } from '../category_store/entities/category_store.entity';
import { StoreAddress } from '../store-address/entities/store-address.entity';
import { StoreSocialMedia } from '../store_social_media/entities/store_social_media.entity';
import { TypeStore } from '../type-store/entities/type-store.entity';
import { File } from 'src/file/file.entity';
import { User } from 'src/users/users.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Store extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  category_store_id: number;

  @Column({ nullable: true })
  type_store_id: number;

  @Column({ nullable: true, unique: true })
  phone_number: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: false })
  creator_id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  online_link: string;

  @Exclude()
  @Column({ nullable: true })
  logo_id: string;

  @Exclude()
  @Column({ nullable: true })
  cover_id: string;

  @Column({ nullable: true })
  card_min_price: number;

  @Column({ nullable: false, default: false })
  registration_completed: boolean;

  @ManyToOne((type) => CategoryStore, (categoryStore) => categoryStore.id, {
    eager: true,
  })
  category_store: CategoryStore;

  @ManyToOne((type) => User, (user) => user.id)
  creator: User;

  @ManyToOne((type) => TypeStore, (typeStore) => typeStore.id, { eager: true })
  type_store: TypeStore;

  @ManyToOne((type) => File, { nullable: true, eager: true })
  @JoinTable({
    joinColumn: 'store_id',
    inverseJoinColumn: 'file_id',
    name: 'store_file',
    synchronize: false,
  } as JoinTableOptions)
  logo: File | File[];

  @ManyToOne((type) => File, { nullable: true, eager: true })
  @JoinTable({
    joinColumn: 'store_id',
    inverseJoinColumn: 'file_id',
    name: 'store_file',
    synchronize: false,
  } as JoinTableOptions)
  cover: File | File[];

  @OneToMany((type) => StoreSocialMedia, (socialMedia) => socialMedia.store)
  social_medias: StoreSocialMedia[];

  @OneToMany((type) => StoreAddress, (storeAddress) => storeAddress.store, {
    eager: true,
  })
  addresses: StoreAddress[];
}
