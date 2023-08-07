import {
  Allow,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { EntityTypeEnum } from 'src/entity-type/entity-type.enum';

export class PointTransfertDTO {
  @IsNotEmpty()
  amount: number;

  @ValidateIf((o) => o.entity_type_id == EntityTypeEnum.User)
  @IsNotEmpty()
  sender_user_id: number;

  @ValidateIf((o) => o.entity_type_id == EntityTypeEnum.Business)
  @IsNotEmpty()
  sender_business_id: number;

  @IsNotEmpty()
  @IsEnum(EntityTypeEnum)
  sender_entity_type_id: number;

  @Allow()
  receiver_id: number;

  @ValidateIf((o) => o.bulk_transfert == true)
  @IsNotEmpty()
  @IsArray()
  receiver_ids: number[];
}
