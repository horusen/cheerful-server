import { Injectable } from '@nestjs/common';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { BaseService } from 'src/shared/services/base.service';
import { SocialMedia } from './entities/social-media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SocialMediaService extends BaseService<SocialMedia> {
  constructor(
    @InjectRepository(SocialMedia)
    private readonly repository: Repository<SocialMedia>,
  ) {
    super(repository);
  }
}
