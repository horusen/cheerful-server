import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { Repository, getRepository } from 'typeorm';
import { User } from './users.entity';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUser } from '../../mocks/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let mockConfigService: ConfigService;
  let mockRepo: Repository<User>;

  const setupMock = () => {
    mockConfigService = createMock<ConfigService>();
    mockRepo = createMock<Repository<User>>();
  };

  beforeEach(async () => {
    setupMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // find by email
  // Should return null if the email is not found
  describe('Find Email', () => {
    const findByEmail = async () => {
      return await service.findByEmail(mockUser.email);
    };

    it('Should return null if the email is not found', async () => {
      (mockRepo.findOne as jest.Mock).mockResolvedValue(null);

      const user = await findByEmail();

      expect(user).toBeNull();
    });

    it('Should return the user', async () => {
      (mockRepo.findOne as jest.Mock).mockResolvedValue(mockUser);

      const user = await findByEmail();

      expect(user).toEqual(mockUser);
    });
  });

  // Sould return a valid user

  // update point balance
  // should throw not found exception if the userId is not valid
  // should increment the point balance and save the user;
});
