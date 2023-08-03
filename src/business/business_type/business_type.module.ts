import { Module } from '@nestjs/common';
import { BusinessTypeService } from './business_type.service';
import { BusinessTypeController } from './business_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessType } from './entities/business_type.entity';
import { BusinessTypeSeeder } from './business_type.seeder';

@Module({
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService, BusinessTypeSeeder],
  imports: [TypeOrmModule.forFeature([BusinessType])],
  exports: [BusinessTypeService, BusinessTypeSeeder],
})
export class BusinessTypeModule {}
