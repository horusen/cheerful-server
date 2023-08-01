import { Module } from '@nestjs/common';
import { BusinessAdminService } from './business_admin.service';
import { BusinessAdminController } from './business_admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAdmin } from './entities/business_admin.entity';

@Module({
  controllers: [BusinessAdminController],
  providers: [BusinessAdminService],
  exports: [BusinessAdminService],
  imports: [TypeOrmModule.forFeature([BusinessAdmin])],
})
export class BusinessAdminModule {}
