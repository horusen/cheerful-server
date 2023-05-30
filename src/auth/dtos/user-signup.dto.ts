import { Allow, IsEmail, IsNotEmpty } from 'class-validator';
import { SameValue } from 'src/shared/validators/same-value.validator';

export class UserSignupDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

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
