import {
  Allow,
  IsEmail,
  IsIn,
  IsNotEmpty,
  Validate,
  ValidateIf,
} from 'class-validator';
import { IsRequiredIf } from 'src/shared/validators/is-required-if.validator';
import { SameValue } from 'src/shared/validators/same-value.validator';

export class UserSignupDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  @IsIn([1, 2, 3])
  type_user_id: number;

  @IsRequiredIf('type_user_id', 1)
  @ValidateIf((o) => o.type_user_id === 1)
  @IsIn([1, 2, 3])
  gender_id: number;

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

  @Allow()
  business_name: string;

  @Allow()
  profile_pic: string;
}
