import { IsNotEmpty } from 'class-validator';

export class verifyOtpDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  code: string;
}
