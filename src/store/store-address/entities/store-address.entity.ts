import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class StoreAddress extends BaseEntity {
  @Column({ nullable: false })
  store_id: number;

  @Column({ nullable: false })
  country_id: string;

  @Column({ nullable: false })
  state_id: string;

  @Column({ nullable: false })
  city_id: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  google_maps_link: string;
}
