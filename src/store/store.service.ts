import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';
import { File } from 'src/file/file.entity';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    public fileService: FileService,
  ) {
    super(storeRepository);
  }

  async findOneByStoreLink(storeLink: string) {
    const element = await this.repo.findOne({
      where: { online_link: storeLink },
      relations: {
        social_medias: true,
      },
    });

    if (!element) throw new NotFoundException();

    return element;
  }

  async findOne(id: number) {
    const element = await this.repo.findOne({
      where: { id },
      relations: {
        addresses: {
          state: true,
          country: true,
        },
      },
    });

    if (!element) throw new NotFoundException();

    return element;
  }

  async createByUserId(userId: number) {
    const element = await this.repo.save({ creator_id: userId });
    return await this.findOne(element.id);
  }

  async findByCreatorId(userId: number) {
    return await this.repo.findOne({ where: { creator_id: userId } });
  }

  async create(createDTO: any, logoImage?: Express.Multer.File) {
    let image: File;
    if (logoImage) {
      image = await this.fileService.uploadFile(
        logoImage.buffer,
        logoImage.originalname,
        FileTypeEnum.IMAGE,
      );
    }
    const element = await this.storeRepository.save({
      ...createDTO,
      logo_id: image?.id,
    });
    return this.findOne(element.id);
  }

  async update(
    id: number,
    updateDTO: any,
    logoImage?: Express.Multer.File,
    coverImage?: Express.Multer.File,
  ) {
    console.log(logoImage);
    console.log(coverImage);
    const element = await this.repo.findOneBy({ id });
    if (!element) throw new NotFoundException();

    let _logoImage: File;
    let _coverImage: File;

    if (logoImage) {
      _logoImage = await this.fileService.uploadFile(
        logoImage.buffer,
        logoImage.originalname,
        FileTypeEnum.IMAGE,
      );

      element.logo_id = _logoImage.id;
    }

    if (coverImage) {
      _coverImage = await this.fileService.uploadFile(
        coverImage.buffer,
        coverImage.originalname,
        FileTypeEnum.IMAGE,
      );

      element.cover_id = _coverImage.id;
    }

    Object.keys(updateDTO).forEach((key) => {
      element[key] = updateDTO[key];
    });

    element.registration_completed = true;

    await this.repo.save(element);

    return await this.repo.findOneBy({ id });
  }
}
