import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessAdminDto } from './create-business_admin.dto';

export class UpdateBusinessAdminDto extends PartialType(CreateBusinessAdminDto) {}
