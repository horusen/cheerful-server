import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/file/file.entity';
import { FileService } from 'src/file/file.service';
import { FileTypeEnum } from 'src/file/file_type/file_type.enum';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(
    @InjectRepository(Business) private readonly _repo: Repository<Business>,
    public fileService: FileService,
    public configService: ConfigService,
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

  async updatePointBalance(
    businessId: number,
    moneyAmount: number,
    increment = true,
  ) {
    const business = await this.findOne(businessId);

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    if (increment) business.point_balance += moneyAmount;
    else business.point_balance -= moneyAmount;

    return await this.repo.save(business);
  }
}
