import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('category_store')
export class CategoryStore extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;
}
