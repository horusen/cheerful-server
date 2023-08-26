import { Allow, IsNotEmpty } from 'class-validator';

export class CreateGenderDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
