import { Module, forwardRef } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { EmployeeModule } from './employee/employee.module';
import { BusinessAdminModule } from './business_admin/business_admin.module';
import { BusinessTypeModule } from './business_type/business_type.module';
import { BusinessIndustryModule } from './business_industry/business_industry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { FileModule } from 'src/file/file.module';
import { PointsModule } from 'src/points/points.module';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService],
  imports: [
    EmployeeModule,
    BusinessAdminModule,
    BusinessTypeModule,
    BusinessIndustryModule,
    FileModule,
    TypeOrmModule.forFeature([Business]),
  ],
  exports: [BusinessService],
})
export class BusinessModule {}
