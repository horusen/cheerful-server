import { Module } from '@nestjs/common';
import { S3ServiceManagerService } from './s3-service-manager/s3-service-manager.service';

@Module({
  providers: [S3ServiceManagerService],
  exports: [S3ServiceManagerService],
})
export class S3Module {}
