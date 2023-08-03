import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BaseService } from 'src/shared/services/base.service';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { File } from 'src/file/file.entity';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(
    @InjectRepository(Business) private readonly _repo: Repository<Business>,
    public fileService: FileService,
  ) {
    super(_repo);
  }

  async findByCreatorId(creator_id: number) {
    return await this._repo.findOne({
      where: {
        creator_id,
      },
    });
  }

  async findOne(id: number) {
    const element = await this.repo.findOne({
      where: { id },
    });

    if (!element) throw new NotFoundException();

    return element;
  }

  async update(id: number, updateDTO: any, logoImage?: Express.Multer.File) {
    const element = await this.repo.findOneBy({ id });
    if (!element) throw new NotFoundException();

    let _logoImage: File;

    if (logoImage) {
      _logoImage = await this.fileService.uploadFile(
        logoImage.buffer,
        logoImage.originalname,
        FileTypeEnum.IMAGE,
      );

      element.business_logo_id = _logoImage.id;
    }

    Object.keys(updateDTO).forEach((key) => {
      element[key] = updateDTO[key];
    });

    element.registration_completed = true;

    await this.repo.save(element);

    return await this.findOne(id);
  }
}
