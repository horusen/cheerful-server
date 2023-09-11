import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
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

  /**
   * Uploads a file to AWS S3 and saves metadata to the database.
   *
   * @param {Buffer} databuffer - The file data as a Buffer.
   * @param {string} filename - The name of the file.
   * @param {number} fileTypeId - The identifier for the file type.
   * @param {EntityManager} [entiyManager] - Optional: TypeORM EntityManager for database transactions.
   *
   * @returns {Promise<File>} A Promise that resolves to the saved file metadata.
   *
   * @throws {Error} If there is an error during file upload or database save.
   */
  async uploadFile(
    databuffer: Buffer,
    filename: string,
    fileTypeId: number,
    entiyManager?: EntityManager,
  ): Promise<File> {
    const uploadedFile = await this._uploadToS3(databuffer, filename);

    let fileSaved: Promise<File>;

    if (entiyManager) {
      fileSaved = this._saveWithEntityManager(
        uploadedFile,
        fileTypeId,
        entiyManager,
      );
    } else {
      fileSaved = this._saveWithRepository(uploadedFile, fileTypeId);
    }

    return await this._handleFileSaveError(uploadedFile, fileSaved);
  }

  async deleteFile(id: string, entityManager?: EntityManager) {
    let file = await this.fileRepository.findOne({ where: { id } });
    if (!file) throw new HttpException('File not found', 422);

    let fileSaved: Promise<DeleteResult>;
    if (entityManager) {
      fileSaved = entityManager.delete(File, id);
    } else {
      fileSaved = this.fileRepository.delete(id);
    }

    await fileSaved.catch((err) => {
      throw new HttpException('Error deleting file from S3', 500);
    });

    await this._deleteFileFromS3(id);

    return file;
  }

  private async _uploadToS3(databuffer: Buffer, filename: string) {
    return await this._s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Body: databuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise()
      .catch((err) => {
        throw new HttpException('Error uploading file to S3', 500);
      });
  }

  private async _saveWithEntityManager(
    uploadedFile: any,
    fileTypeId: number,
    entiyManager: EntityManager,
  ) {
    return entiyManager.save(File, {
      id: uploadedFile.Key,
      url: uploadedFile.Location,
      file_type_id: fileTypeId,
    });
  }

  private async _saveWithRepository(uploadedFile: any, fileTypeId: number) {
    return this.fileRepository
      .save({
        id: uploadedFile.Key,
        url: uploadedFile.Location,
        file_type_id: fileTypeId,
      })
      .catch(async (err) => {
        await this._deleteFileFromS3(uploadedFile.Key);
        throw new HttpException('Error saving file to database', 500);
      });
  }

  private async _handleFileSaveError(
    uploadedFile: any,
    fileSaved: Promise<File>,
  ) {
    return await fileSaved.catch(async (err) => {
      await this._deleteFileFromS3(uploadedFile.Key);
      throw new HttpException('Error saving file to database', 500);
    });
  }

  private async _deleteFileFromS3(key: string) {
    return this._s3
      .deleteObject({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Key: key,
      })
      .promise()
      .catch((err) => {
        throw new HttpException('Error deleting file from S3', 500);
      });
  }
}
