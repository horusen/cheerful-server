import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { StoreProduct } from './entities/store-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';
import { File } from 'src/file/file.entity';

@Injectable()
export class StoreProductService extends BaseService<StoreProduct> {
  constructor(
    @InjectRepository(StoreProduct)
    private readonly _repo: Repository<StoreProduct>,
    public fileService: FileService,
  ) {
    super(_repo);
  }

  async create(createDTO: any, productImage?: Express.Multer.File) {
    let image: File;
    if (productImage) {
      image = await this.fileService.uploadFile(
        productImage.buffer,
        productImage.originalname,
        FileTypeEnum.IMAGE,
      );
    }

    return await this._repo.save({
      ...createDTO,
      image_id: image?.id,
    });
    // return this.findOne(element.id);
  }

  findByStoreId(storeId: number): Promise<StoreProduct[]> {
    return this._repo.find({
      where: { store_id: storeId },
    });
  }
}
