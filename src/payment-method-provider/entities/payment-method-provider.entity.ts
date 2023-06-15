import { BaseEntity } from 'src/shared/entities/base.entity';
import { TypePaymentMethodProvider } from 'src/type-payment-method-provider/entities/type-payment-method-provider.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PaymentMethodProvider extends BaseEntity {
  @Column({ nullable: false })
  type_payment_method_provider_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => TypePaymentMethodProvider, (pmp) => pmp.id)
  type_payment_method_provider: TypePaymentMethodProvider;
}
