import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
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
  gender: string;

  @Column()
  location: string;

  @Column({
    nullable: true,
  })
  password: string;
}
