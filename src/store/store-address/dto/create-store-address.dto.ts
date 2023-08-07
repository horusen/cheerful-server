import { Allow, IsNotEmpty } from 'class-validator';

export class CreateStoreAddressDto {
  @IsNotEmpty()
  store_id: number;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  state_id: number;

  @IsNotEmpty()
  address: string;

  @Allow()
  google_maps_link: string;
}
