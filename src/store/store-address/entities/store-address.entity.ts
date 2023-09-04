import { BaseEntity } from 'src/shared/entities/base.entity';
import { Store } from 'src/store/entities/store.entity';
import { Country } from 'src/users/country/entities/country.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { State } from '../../../state/entities/state.entity';

@Entity()
export class StoreAddress extends BaseEntity {
  @Column({ nullable: false })
  store_id: number;

  @Column({ nullable: false })
  country_id: string;

  @Column({ nullable: false })
  state_id: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  google_maps_link: string;

  @ManyToOne((type) => State, (state) => state.id)
  state: State;

  @ManyToOne((type) => Country, (country) => country.id)
  country: Country;

  @ManyToOne((type) => Store, (store) => store.id)
  store: Store;
}
