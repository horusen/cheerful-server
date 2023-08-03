import { File } from 'src/file/file.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BusinessType } from '../business_type/entities/business_type.entity';
import { Country } from 'src/users/country/entities/country.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { User } from 'src/users/users.entity';
import { BusinessIndustry } from '../business_industry/entities/business_industry.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Business extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  @Exclude()
  business_logo_id: string;

  @Column({ nullable: true })
  email_address: string;

  @Column({ nullable: true })
  @Exclude()
  type_business_id: number;

  @Column({ nullable: true })
  @Exclude()
  industry_id: number;

  @Column({ nullable: true })
  description: number;

  @Column({ nullable: true })
  @Exclude()
  country_id: number;

  @Column({ nullable: true })
  @Exclude()
  currency_id: number;

  @Column({ nullable: false, default: 0 })
  @Exclude()
  point_balance: number;

  @Column({ nullable: false })
  creator_id: number;

  @Column({ nullable: false, default: false })
  registration_completed: boolean;

  @ManyToOne((type) => File, (file) => file.id, {
    eager: true,
  })
  business_logo: File;

  @ManyToOne((type) => BusinessType, (business_type) => business_type.id, {
    eager: true,
  })
  type_business: BusinessType;

  @ManyToOne((type) => Country, (country) => country.id, {
    eager: true,
  })
  country: Country;

  @ManyToOne((type) => Currency, (currency) => currency.id, {
    eager: true,
  })
  currency: Currency;

  @ManyToOne((type) => BusinessIndustry, (industry) => industry.id, {
    eager: true,
  })
  industry: BusinessIndustry;

  @ManyToOne((type) => User, (user) => user.id, {
    eager: false,
  })
  creator: User;
}
