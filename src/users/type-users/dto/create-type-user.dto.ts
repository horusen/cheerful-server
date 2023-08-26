import { Allow, IsNotEmpty } from 'class-validator';

export class CreateTypeUserDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  description: string;
}
