import { SocialMedia } from 'src/social-media/entities/social-media.entity';
import { Injectable } from '@nestjs/common';
import { BaseSeeder } from 'src/shared/seeders/base-seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SocialMediaSeeder extends BaseSeeder<SocialMedia> {
  constructor(
    @InjectRepository(SocialMedia)
    public readonly repo: Repository<SocialMedia>,
  ) {
    super(repo, [
      {
        name: 'Facebook',
        description: 'Facebook',
      },
      {
        name: 'Twitter',
        description: 'Twitter',
      },
      {
        name: 'Instagram',
        description: 'Instagram',
      },
      {
        name: 'Youtube',
        description: 'Youtube',
      },
      {
        name: 'Tiktok',
        description: 'Tiktok',
      },
      {
        name: 'Snapchat',
        description: 'Snapchat',
      },
    ]);
  }
}
