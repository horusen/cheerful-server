import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { File } from './file.entity';

@Injectable()
export class FileService {
  private _s3: S3;
  constructor(
    public configService: ConfigService,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {
    this._s3 = new S3();
  }

  async uploadFile(databuffer: Buffer, filename: string) {
    const uploadedFile = await this._s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Body: databuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise()
      .catch((err) => {
        console.log(err);
        throw new HttpException('Error uploading file', 500);
      });

    return await this.fileRepository.save({
      id: uploadedFile.Key,
      url: uploadedFile.Location,
    });
  }
}
