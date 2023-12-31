import { SocialMedia } from 'src/social-media/entities/social-media.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('store_social_media')
export class StoreSocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  store_id: number;

  @Column()
  social_media_id: number;

  @Column({ nullable: false })
  link: string;

  @ManyToOne((type) => SocialMedia, (sm) => sm.id, { eager: true })
  social_media: SocialMedia;

  @ManyToOne((type) => Store, (store) => store.id)
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
