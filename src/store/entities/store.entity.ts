import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CategoryStore } from '../category_store/entities/category_store.entity';
import { TypeStore } from 'src/type-store/entities/type-store.entity';

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
  store_logo_image: string;

  @ManyToOne((type) => CategoryStore, (categoryStore) => categoryStore.id, {
    eager: true,
  })
  category_store: CategoryStore;

  @ManyToOne((type) => TypeStore, (typeStore) => typeStore.id, { eager: true })
  type_store: TypeStore;
}
