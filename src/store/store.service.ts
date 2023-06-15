import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileServiceService } from 'src/file-service/file-service.service';
import { File } from 'src/file-service/file.entity';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    public fileService: FileServiceService,
  ) {
    super(storeRepository);
  }

  async findOne(id: number) {
    const element = await this.repo.findOne({
      where: { id },
      relations: {
        addresses: {
          city: true,
          state: true,
          country: true,
        },
        payment_methods: {
          payment_method_provider: {
            type_payment_method_provider: true,
          },
        },
      },
    });

    if (!element) throw new NotFoundException();

    return element;
  }

  async createByUserId(userId: number) {
    const element = await this.repo.save({ user_id: userId });
    return await this.findOne(element.id);
  }

  async findByUserId(userId: number) {
    return await this.repo.findOne({ where: { user_id: userId } });
  }

  async create(createDTO: any, logoImage?: Express.Multer.File) {
    let image: File;
    if (logoImage) {
      image = await this.fileService.uploadFile(
        logoImage.buffer,
        logoImage.originalname,
      );
    }
    const element = await this.storeRepository.save({
      ...createDTO,
      store_logo_image_id: image?.id,
    });
    return this.findOne(element.id);
  }

  async update(
    id: number,
    updateDTO: any,
    logoImage?: Express.Multer.File,
    coverImage?: Express.Multer.File,
  ) {
    const element = await this.repo.findOneBy({ id });

    let _logoImage: File;
    let _coverImage: File;

    if (logoImage) {
      _logoImage = await this.fileService.uploadFile(
        logoImage.buffer,
        logoImage.originalname,
      );

      element.store_logo_image_id = _logoImage.id;
    }

    if (coverImage) {
      _coverImage = await this.fileService.uploadFile(
        coverImage.buffer,
        coverImage.originalname,
      );

      element.store_cover_image_id = _coverImage.id;
    }

    if (!element) throw new NotFoundException();
    Object.keys(updateDTO).forEach((key) => {
      element[key] = updateDTO[key];
    });
    await this.repo.save(element);
    return await this.repo.findOneBy({ id });
  }
}
