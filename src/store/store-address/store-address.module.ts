import { Module } from '@nestjs/common';
import { StoreAddressService } from './store-address.service';
import { StoreAddressController } from './store-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreAddress } from './entities/store-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreAddress])],
  controllers: [StoreAddressController],
  providers: [StoreAddressService],
})
export class StoreAddressModule {}
