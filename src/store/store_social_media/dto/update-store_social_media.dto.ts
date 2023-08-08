import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreSocialMediaDto } from './create-store_social_media.dto';

export class UpdateStoreSocialMediaDto extends PartialType(CreateStoreSocialMediaDto) {}
