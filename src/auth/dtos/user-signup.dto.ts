import {
  Allow,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  Validate,
  ValidateIf,
} from 'class-validator';
import { IsRequiredIf } from 'src/shared/validators/is-required-if.validator';
import { SameValue } from 'src/shared/validators/same-value.validator';
import { TypeUserEnum } from 'src/users/type-users/type-user.enum';

export class UserSignupDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country_id: number;

  @IsEnum(TypeUserEnum)
  @IsNotEmpty()
  type_user_id: number;

  @ValidateIf((o) => o.type_user_id === TypeUserEnum.Individual)
  @IsNotEmpty()
  @IsIn([1, 2, 3])
  gender_id: number;

  @ValidateIf((o) => o.type_user_id === TypeUserEnum.Individual)
  @IsNotEmpty()
  invitation_id: number;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @SameValue('password_confirmation')
  password: string;

  @Allow()
  password_confirmation: string;

  @ValidateIf((o) => o.type_user_id === TypeUserEnum.BusinessAdmin)
  @IsNotEmpty()
  business_name: string;

  @ValidateIf((o) => o.type_user_id === TypeUserEnum.Merchant)
  @IsNotEmpty()
  store_name: string;

  @Allow()
  profile_pic: string;
}
