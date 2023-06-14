import { Module } from '@nestjs/common';
import { StoreCardService } from './store-card.service';
import { StoreCardController } from './store-card.controller';
import { FileModule } from 'src/file-service/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreCard } from './entities/store-card.entity';

@Module({
  imports: [FileModule, TypeOrmModule.forFeature([StoreCard])],
  controllers: [StoreCardController],
  providers: [StoreCardService],
})
export class StoreCardModule {}
