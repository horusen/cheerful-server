import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class OtpStatus {
    @PrimaryColumn()
    id: string

    @Column({ nullable: false })
    name: string
}