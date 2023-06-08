import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class StorePaymentMethod extends BaseEntity {
  @Column({ nullable: false })
  payment_method_provider_id: number;

  @Column({ nullable: false })
  account_number: string;

  @Column({ nullable: false })
  store_id: number;
}
