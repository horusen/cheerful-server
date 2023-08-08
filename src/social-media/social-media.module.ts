import { Module } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './entities/social-media.entity';
import { SocialMediaSeeder } from './social-media.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService, SocialMediaSeeder],
  exports: [SocialMediaSeeder],
})
export class SocialMediaModule {}
