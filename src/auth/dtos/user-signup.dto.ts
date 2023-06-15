import { Allow, IsEmail, IsNotEmpty } from 'class-validator';
import { SameValue } from 'src/shared/validators/same-value.validator';

export class UserSignupDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  type_user_id: number;

  @IsNotEmpty()
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
}
