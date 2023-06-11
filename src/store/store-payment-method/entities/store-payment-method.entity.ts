import { PaymentMethodProvider } from 'src/payment-method-provider/entities/payment-method-provider.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class StorePaymentMethod extends BaseEntity {
  @Column({ nullable: false })
  payment_method_provider_id: number;

  @Column({ nullable: false })
  account_number: string;

  @Column({ nullable: false })
  store_id: number;

  @ManyToOne((type) => PaymentMethodProvider, (pmp) => pmp.id)
  payment_method_provider: PaymentMethodProvider;
}
