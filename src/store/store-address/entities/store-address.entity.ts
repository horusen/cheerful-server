import { City } from 'src/city/entities/city.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { State } from 'src/state/entities/state.entity';
import { Country } from 'src/users/country/entities/country.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne((type) => City, (city) => city.id)
  city: City;

  @ManyToOne((type) => State, (state) => state.id)
  state: State;

  @ManyToOne((type) => Country, (country) => country.id)
  country: Country;
}
