import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { StoreCard } from './entities/store-card.entity';
import { Repository } from 'typeorm';
import { FileServiceService } from 'src/file-service/file-service.service';
import { File } from 'src/file-service/file.entity';

@Injectable()
export class StoreCardService extends BaseService<StoreCard> {
  constructor(
    @InjectRepository(StoreCard)
    private readonly _repo: Repository<StoreCard>,
    public fileService: FileServiceService,
  ) {
    super(_repo);
  }

  async create(createDTO: any, storeCardLogo?: Express.Multer.File) {
    let _logoImage: File;
    if (storeCardLogo) {
      _logoImage = await this.fileService.uploadFile(
        storeCardLogo.buffer,
        storeCardLogo.originalname,
      );

      createDTO['card_image_id'] = _logoImage.id;
    }
    const element = await this.repo.save(createDTO);
    return this.findOne(element.id);
  }

  async findByStoreId(storeId: number) {
    return this.repo.find({ where: { store_id: storeId } });
  }
}
