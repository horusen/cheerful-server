import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionTypeController } from './connection-type.controller';
import { ConnectionTypeService } from './connection-type.service';

describe('ConnectionTypeController', () => {
  let controller: ConnectionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionTypeController],
      providers: [ConnectionTypeService],
    }).compile();

    controller = module.get<ConnectionTypeController>(ConnectionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
