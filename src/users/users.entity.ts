import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  type_user_id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  phone_number: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  gender_id: number;

  @Column()
  country_id: number;

  @Column({
    nullable: true,
  })
  password: string;
}
