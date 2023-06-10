import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CategoryStore } from '../category_store/entities/category_store.entity';
import { TypeStore } from 'src/type-store/entities/type-store.entity';

@Entity()
export class Store extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  category_store_id: number;

  @Column({ nullable: false })
  type_store_id: number;

  @Column({ nullable: false, unique: true })
  phone_number: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  store_online_link: string;

  @Column({ nullable: true })
  store_logo_image: string;

  @ManyToOne((type) => CategoryStore, (categoryStore) => categoryStore.id)
  category: CategoryStore;

  @ManyToOne((type) => TypeStore, (typeStore) => typeStore.id)
  type: TypeStore;
}
