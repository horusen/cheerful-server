import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateIf,
  isEnum,
} from 'class-validator';
import { EntityTypeEnum } from 'src/entity-type/entity-type.enum';

export class LoadPointDTO {
  @IsNotEmpty()
  @IsEnum(EntityTypeEnum)
  entity_type_id: number;

  @ValidateIf((o) => o.entity_type_id == EntityTypeEnum.User)
  @IsNotEmpty()
  entity_user_id: number;

  @ValidateIf((o) => o.entity_type_id == EntityTypeEnum.User)
  @IsNotEmpty()
  entity_business_id: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
