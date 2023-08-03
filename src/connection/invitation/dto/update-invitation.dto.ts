import { Allow, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateInvitationDto {
  @IsNotEmpty()
  @IsIn([1, 2, 3])
  status: number;
}
