import { BaseEntity } from '../../../shared/entities/base.entity';
import { AfterInsert, Column, Entity } from 'typeorm';
import { OtpStatusEnum } from '../enums/otp_status.enum';

@Entity()
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false, default: OtpStatusEnum.Pending })
  otp_status_id: number;

  @Column({ nullable: true, type: 'timestamp' })
  expiry_datetime: Date;

  @Column({ nullable: false, default: 0 })
  attempt: number;

  @AfterInsert()
  async afterInsert() {
    this.expiry_datetime = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
}
