import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreCardDto } from './create-store-card.dto';

export class UpdateStoreCardDto extends PartialType(CreateStoreCardDto) {}
