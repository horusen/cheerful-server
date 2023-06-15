import { Allow, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  store_id: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  recipient_name: string;

  @IsNotEmpty()
  recipient_phone_number: string;

  @Allow()
  attachement: string;

  @Allow()
  additional_comments: string;

  @Allow()
  scheduled_time: Date;
}
