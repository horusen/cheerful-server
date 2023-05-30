import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  phone_number: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;
}
