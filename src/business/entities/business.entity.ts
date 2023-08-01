import { File } from 'src/file/file.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BusinessType } from '../business_type/entities/business_type.entity';
import { Country } from 'src/users/country/entities/country.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Business extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  business_logo_id: number;

  @Column({ nullable: true })
  email_address: string;

  @Column({ nullable: true })
  type_business_id: number;

  @Column({ nullable: true })
  industry_id: number;

  @Column({ nullable: true })
  country_id: number;

  @Column({ nullable: true })
  currency_id: number;

  @Column({ nullable: false, default: 0 })
  point_balance: number;

  @Column({ nullable: false })
  creator_id: number;

  @ManyToOne((type) => File, (file) => file.id, {
    eager: false,
  })
  file: File;

  @ManyToOne((type) => BusinessType, (business_type) => business_type.id, {
    eager: false,
  })
  business_type: BusinessType;

  @ManyToOne((type) => Country, (country) => country.id, {
    eager: false,
  })
  country: Country;

  @ManyToOne((type) => Currency, (currency) => currency.id, {
    eager: false,
  })
  currency: Currency;

  @ManyToOne((type) => User, (user) => user.id, {
    eager: false,
  })
  creator: User;
}
