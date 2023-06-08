import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PaymentMethodProvider extends BaseEntity {
  @Column({ nullable: false })
  type_payment_method_provider_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;
}
