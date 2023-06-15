import { Test, TestingModule } from '@nestjs/testing';
import { TypeUsersController } from './type-users.controller';
import { TypeUsersService } from './type-users.service';

describe('TypeUsersController', () => {
  let controller: TypeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeUsersController],
      providers: [TypeUsersService],
    }).compile();

    controller = module.get<TypeUsersController>(TypeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
