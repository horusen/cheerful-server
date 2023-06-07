import { Injectable } from '@nestjs/common';
import { CreateTypeStoreDto } from './dto/create-type-store.dto';
import { UpdateTypeStoreDto } from './dto/update-type-store.dto';
import { BaseService } from 'src/shared/services/base.service';
import { TypeStore } from './entities/type-store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeStoreService extends BaseService<TypeStore> {
  constructor(
    @InjectRepository(TypeStore)
    private readonly TypeStoreRepository: Repository<TypeStore>,
  ) {
    super(TypeStoreRepository);
  }
}
