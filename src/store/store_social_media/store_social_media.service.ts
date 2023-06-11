import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreSocialMediaDto } from './dto/create-store_social_media.dto';
import { UpdateStoreSocialMediaDto } from './dto/update-store_social_media.dto';
import { StoreSocialMedia } from './entities/store_social_media.entity';
import { BaseService } from 'src/shared/services/base.service';
import { Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreSocialMediaService extends BaseService<StoreSocialMedia> {
  constructor(
    @InjectRepository(StoreSocialMedia)
    private readonly _repo: Repository<StoreSocialMedia>,
  ) {
    super(_repo);
  }

  findByStoreId(storeId: number): Promise<StoreSocialMedia[]> {
    return this._repo.find({
      where: { store_id: storeId },
      relations: ['social_media'],
    });
  }
}
