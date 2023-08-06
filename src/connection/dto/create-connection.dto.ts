import { IsNotEmpty, ValidateIf } from 'class-validator';
import { ConnectionTypeEnum } from '../connection-type/connection-type.enum';

export class CreateConnectionDto {
  @IsNotEmpty()
  connection_type_id: number;

  @IsNotEmpty()
  user1_id: number;

  @ValidateIf((o) => o.connection_type_id == ConnectionTypeEnum.UserToUser)
  @IsNotEmpty()
  user2_id?: number;

  @ValidateIf((o) => o.connection_type_id == ConnectionTypeEnum.BusinessToUser)
  @IsNotEmpty()
  business_id?: number;
}
