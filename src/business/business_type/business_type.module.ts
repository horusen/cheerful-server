import { Module } from '@nestjs/common';
import { BusinessTypeService } from './business_type.service';
import { BusinessTypeController } from './business_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessType } from './entities/business_type.entity';

@Module({
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService],
  imports: [TypeOrmModule.forFeature([BusinessType])],
})
export class BusinessTypeModule {}
