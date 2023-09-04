import { Module } from '@nestjs/common';
import { StoreSocialMediaService } from './store_social_media.service';
import { StoreSocialMediaController } from './store_social_media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreSocialMedia } from './entities/store_social_media.entity';
import { SocialMediaModule } from '../../social-media/social-media.module';

@Module({
  imports: [TypeOrmModule.forFeature([StoreSocialMedia]), SocialMediaModule],
  controllers: [StoreSocialMediaController],
  providers: [StoreSocialMediaService],
})
export class StoreSocialMediaModule {}
