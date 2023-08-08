import { Module } from '@nestjs/common';
import { StoreCardService } from './store-card.service';
import { StoreCardController } from './store-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreCard } from './entities/store-card.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule, TypeOrmModule.forFeature([StoreCard])],
  controllers: [StoreCardController],
  providers: [StoreCardService],
})
export class StoreCardModule {}
