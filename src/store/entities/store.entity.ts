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
import { TypeStore } from 'src/type-store/entities/type-store.entity';
import { File } from 'src/file-service/file.entity';
import { Exclude, Expose } from 'class-transformer';
import { StoreCardService } from '../store-card/store-card.service';
import { StoreCard } from '../store-card/entities/store-card.entity';
import { StoreAddress } from '../store-address/entities/store-address.entity';
import { StorePaymentMethod } from '../store-payment-method/entities/store-payment-method.entity';

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

  @Column()
  user_id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  store_online_link: string;

  @Column({ nullable: true })
  store_logo_image_id: string;

  @Column({ nullable: true })
  store_cover_image_id: string;

  @ManyToOne((type) => CategoryStore, (categoryStore) => categoryStore.id, {
    eager: true,
  })
  category_store: CategoryStore;

  @ManyToOne((type) => TypeStore, (typeStore) => typeStore.id, { eager: true })
  type_store: TypeStore;

  @ManyToOne((type) => File, { nullable: true, eager: true })
  @JoinTable({
    joinColumn: 'store_id',
    inverseJoinColumn: 'file_id',
    name: 'store_file',
    synchronize: false,
  } as JoinTableOptions)
  store_logo_image: File | File[];

  @ManyToOne((type) => File, { nullable: true, eager: true })
  @JoinTable({
    joinColumn: 'store_id',
    inverseJoinColumn: 'file_id',
    name: 'store_file',
    synchronize: false,
  } as JoinTableOptions)
  store_cover_image: File | File[];

  @OneToMany((type) => StoreAddress, (storeAddress) => storeAddress.store)
  addresses: StoreAddress[];

  @OneToMany(
    (type) => StorePaymentMethod,
    (storePaymentMethod) => storePaymentMethod.store,
  )
  payment_methods: StorePaymentMethod[];

  @Exclude()
  @OneToMany((type) => StoreCard, (storeCard) => storeCard.store, {
    eager: true,
  })
  cards: StoreCard[];

  @Expose()
  get card_min_price() {
    return this.cards.reduce(
      (min, p) => (p.min_price < min ? p.min_price : min),
      this.cards[0]?.min_price || 0,
    );
  }

  @Expose()
  get card() {
    return this.cards[0];
  }
}
