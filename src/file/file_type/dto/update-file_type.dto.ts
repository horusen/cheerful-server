import { PartialType } from '@nestjs/mapped-types';
import { CreateFileTypeDto } from './create-file_type.dto';

export class UpdateFileTypeDto extends PartialType(CreateFileTypeDto) {}
