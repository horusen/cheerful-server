import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country/entities/country.entity';
import { TypeUser } from './type-users/entities/type-user.entity';
import { Gender } from './gender/entities/gender.entity';
import { File } from 'src/file/file.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  type_user_id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phone_number: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  gender_id: number;

  @Column({ nullable: true })
  country_id: number;

  @Exclude()
  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: false,
    default: false,
  })
  verified: boolean;

  @Column({ nullable: true })
  profile_pic_id: number;

  @Column({ nullable: false, default: 0 })
  point_balance: number;

  @ManyToOne((type) => File, (profile_pic) => profile_pic.id, {
    eager: true,
  })
  profile_pic: File;

  @ManyToOne((type) => Country, (country) => country.id, {
    eager: false,
  })
  country: Country;

  @ManyToOne((type) => TypeUser, (type_user) => type_user.id, {
    eager: false,
  })
  type_user: TypeUser;

  @ManyToOne((type) => Gender, (gender) => gender.id, {
    eager: false,
  })
  gender: Gender;
}
