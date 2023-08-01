import { Allow, IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { SameValue } from 'src/shared/validators/same-value.validator';

export class UserSignupDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  @IsIn([1, 2, 3])
  type_user_id: number;

  @Allow()
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
