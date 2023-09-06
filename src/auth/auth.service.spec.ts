import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { FileService } from '../file/file.service';
import { JwtService } from '@nestjs/jwt';
import { BusinessService } from '../business/business.service';
import { EmailService } from '../shared/email/email.service';
import { InvitationService } from '../connection/invitation/invitation.service';
import { StoreService } from '../store/store.service';
import { HashService } from '../shared/services/hash/hash.service';
import { UserSignupDTO } from './dtos/user-signup.dto';
import { TypeUserEnum } from '../users/type-users/type-user.enum';
import { UnprocessableEntityException } from '@nestjs/common';
import { fail } from 'assert';
import { Invitation } from '../connection/invitation/invitation.entity';
import { User } from '../users/users.entity';
import { Business } from '../business/entities/business.entity';
import { Store } from '../store/entities/store.entity';
import { FileType } from '../file/file_type/entities/file_type.entity';
import { FileTypeEnum } from '../file/file_type/file_type.enum';
import { File } from 'src/file/file.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userSignupDTO: UserSignupDTO;
  let mockUserService: Partial<UsersService>;
  let mockFileService: Partial<FileService>;
  let mockJwtService: Partial<JwtService>;
  let mockBusinessService: Partial<BusinessService>;
  let mockEmailService: Partial<EmailService>;
  let mockInvitationService: Partial<InvitationService>;
  let mockStoreService: Partial<StoreService>;
  let mockHashService: Partial<HashService>;
  let mockUser: User;
  let mockBusiness: Business;
  let mockStore: Store;
  let mockFile: File;
  let mockInvitation: Invitation;
  let mockProfilePic: Express.Multer.File;

  const setupMocks = () => {
    mockUser = { id: 1, name: 'John Doe' } as User;
    mockBusiness = { id: 1, name: 'My business' } as Business;
    mockStore = { id: 1, name: 'My store' } as Store;
    mockFile = { id: '1', url: 'https://example.com' } as File;
    mockInvitation = { id: 1, receiver_id: 1 } as Invitation;
    mockProfilePic = {
      buffer: Buffer.from('profile_image_data'),
      originalname: 'profile_image.jpg',
    } as Express.Multer.File;

    mockUserService = {
      findByEmail: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    mockHashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    mockFileService = {
      uploadFile: jest.fn(),
    };

    mockInvitationService = {
      acceptInvitation: jest.fn(),
      findOne: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn(),
    };

    mockBusinessService = {
      create: jest.fn(),
      findByCreatorId: jest.fn(),
    };

    mockEmailService = {};

    mockStoreService = {
      findByCreatorId: jest.fn(),
      create: jest.fn(),
    };
  };

  beforeEach(async () => {
    setupMocks();

    userSignupDTO = {
      name: 'John Doe',
      country_id: 1,
      phone_number: '1234567890',
      email: 'Kx1JW@example.com',
      password: 'password',
      password_confirmation: 'password',
    } as UserSignupDTO;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: FileService,
          useValue: mockFileService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: BusinessService,
          useValue: mockBusinessService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: InvitationService,
          useValue: mockInvitationService,
        },
        {
          provide: StoreService,
          useValue: mockStoreService,
        },
        {
          provide: HashService,
          useValue: mockHashService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it("Should save the user's profile picture", async () => {
      // Arrange
      (mockFileService.uploadFile as jest.Mock).mockResolvedValue(mockFile);

      // Act
      await service.saveProfilePic(mockProfilePic);

      // Assert
      expect(mockFileService.uploadFile).toBeCalledWith(
        mockProfilePic.buffer,
        mockProfilePic.originalname,
        FileTypeEnum.IMAGE,
      );
    });

    describe('Signup the user as individual', () => {
      const signupIndividual = async () => {
        return await service.signupIndividual(userSignupDTO, null);
      };
      beforeEach(() => {
        userSignupDTO.type_user_id = TypeUserEnum.Individual;
        userSignupDTO.gender_id = 1;
        userSignupDTO.invitation_id = 1;
      });
      // Should check if there is an valid invitation for the user
      it('Should throw an exception if the invitation is not found', async () => {
        // Arrange
        (mockInvitationService.findOne as jest.Mock).mockRejectedValue(
          new Error(),
        );

        try {
          // Act
          await signupIndividual();

          // Assert
          fail('Should throw an exception');
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableEntityException);
          expect(error.message).toBe('Invitation not found');
        }
      });

      it("Should throw an exception if the user doesn't exist", async () => {
        // Arrange
        // Mock the findOne method from Invitation
        (mockInvitationService.findOne as jest.Mock).mockResolvedValue(
          mockInvitation,
        );

        // Mock the findByEmail method from UsersService
        (mockUserService.findByEmail as jest.Mock).mockRejectedValue(
          new Error(),
        );

        try {
          // Act
          await signupIndividual();

          // Assert
          fail('Should throw an exception');
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableEntityException);
          expect(error.message).toBe('User not found');
        }
      });

      it('Should signup the user', async () => {
        // Arrange
        (mockInvitationService.findOne as jest.Mock).mockResolvedValue(
          mockInvitation,
        );
        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
        (mockUserService.update as jest.Mock).mockResolvedValue(mockUser);
        (mockHashService.hash as jest.Mock).mockResolvedValue('hashedPassword');

        // Act
        const user = await signupIndividual();

        // Assert
        expect(service.hashService.hash).toHaveBeenCalledWith(
          userSignupDTO.password,
        );
        expect(user).toBeDefined();
      });
    });

    describe('Signup the user as business owner or merchant', () => {
      const signupNonIndividual = async (image?: Express.Multer.File) => {
        return await service.signupNonIndividual(userSignupDTO, image);
      };

      it('Should throw an exception if the user already exists', async () => {
        //Arrange
        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);

        try {
          // Act
          await signupNonIndividual();

          // Assert
          fail('Should throw an exception');
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableEntityException);
          expect(error.message).toBe('Email already in use');
        }
      });

      // Should signup the user as Business Admin
      it('Should signup the user as business admin', async () => {
        // Arrange
        userSignupDTO.type_user_id = TypeUserEnum.BusinessAdmin;
        userSignupDTO.business_name = 'Business name';

        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(null);
        (mockUserService.create as jest.Mock).mockResolvedValue(mockUser);
        (mockHashService.hash as jest.Mock).mockReturnValue('hashedPassword');
        (mockBusinessService.create as jest.Mock).mockResolvedValue(
          mockBusiness,
        );

        // Act
        const user = await signupNonIndividual();

        // Assert
        // Expect to hash the password
        expect(service.hashService.hash).toHaveBeenCalledWith(
          userSignupDTO.password,
        );

        // Expect to create the user
        expect(service.usersService.create).toBeCalledWith({
          ...userSignupDTO,
          password: 'hashedPassword',
          profile_pic_id: undefined,
        });

        // Expect to create the business
        expect(service.businessService.create).toBeCalledWith({
          name: userSignupDTO.business_name,
          creator_id: 1,
        });

        expect(user).toBeDefined();
      });

      //Should signup the user as Merchant
      it('Should signup the user as Merchant', async () => {
        const mockProfilePic = {
          buffer: Buffer.from('profile_image_data'),
          originalname: 'profile_image.jpg',
        } as Express.Multer.File;

        // Arrange
        userSignupDTO.type_user_id = TypeUserEnum.Merchant;
        userSignupDTO.store_name = 'Store name';
        userSignupDTO.profile_pic = 'mockProfilePic';

        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(null);
        (mockUserService.create as jest.Mock).mockResolvedValue(mockUser);
        (mockStoreService.create as jest.Mock).mockResolvedValue(mockStore);
        (mockHashService.hash as jest.Mock).mockReturnValue('hashedPassword');

        jest.spyOn(service, 'saveProfilePic').mockResolvedValue(mockFile);

        // Act
        const user = await signupNonIndividual(mockProfilePic);

        // Expect to hash the password
        expect(service.hashService.hash).toHaveBeenCalledWith(
          userSignupDTO.password,
        );

        // Expect to upload the profile picture
        expect(service.saveProfilePic).toBeCalledWith(mockProfilePic);

        // Expect to create the user
        expect(service.usersService.create).toHaveBeenCalledWith({
          ...userSignupDTO,
          password: 'hashedPassword',
          profile_pic_id: mockFile.id,
        });

        // Expect to create the store
        expect(service.storeService.create).toHaveBeenCalledWith({
          name: userSignupDTO.store_name,
          creator_id: 1,
        });

        expect(user).toBeDefined();
      });
    });

    it('Should save the user and login', async () => {
      userSignupDTO.type_user_id = TypeUserEnum.Individual;
      // Arrange
      (mockInvitationService.findOne as jest.Mock).mockResolvedValue(
        mockInvitation,
      );
      (mockUserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (mockUserService.update as jest.Mock).mockResolvedValue(mockUser);
      (mockHashService.hash as jest.Mock).mockResolvedValue('hashedPassword');
      jest.spyOn(service, 'login').mockResolvedValue({
        user: mockUser,
        accessToken: 'access token',
        type_user: TypeUserEnum.Individual,
      });

      // Act
      const user = await service.signup(userSignupDTO, null);

      // Assert
      expect(user).toBeDefined();
    });

    describe('login', () => {
      const login = async () => {
        return await service.login(mockUser);
      };

      beforeEach(() => {
        (mockJwtService.sign as jest.Mock).mockReturnValue('accessToken');
      });

      // it("Should throw an exception if the user doesn't exist", async () => {
      //   (mockUserService.findByEmail as jest.Mock).mockRejectedValue(null);

      //   try {
      //     await login();
      //     fail('Should throw an exception');
      //   } catch (e) {
      //     expect(e).toBeInstanceOf(UnprocessableEntityException);
      //     expect(e.message).toBe('User not found');
      //   }
      // });

      // it('Should throw an exception if the password is incorrect', async () => {
      //   (mockUserService.findByEmail as jest.Mock).mockResolvedValue(user);
      //   (mockHashService.compare as jest.Mock).mockRejectedValue(false);
      //   try {
      //     await login();
      //     fail('Should throw an exception');
      //   } catch (e) {
      //     expect(e).toBeInstanceOf(UnprocessableEntityException);
      //     expect(e.message).toBe('Incorrect password');
      //   }
      // });

      // should return the user and an access token
      it('Should return the user, the user type and an access token', async () => {
        mockUser.type_user_id = 1;
        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
        (mockHashService.compare as jest.Mock).mockResolvedValue(true);

        const response = await login();
        expect(response.user).toBeDefined();
        expect(response.type_user).toBeDefined();
        expect(response.accessToken).toBeDefined();
      });

      // should return the user, the access token and business if the user is a business admin
      it('Should return the user, the user type, the access token and business', async () => {
        mockUser.type_user_id = 2;
        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
        (mockHashService.compare as jest.Mock).mockResolvedValue(true);
        (mockBusinessService.findByCreatorId as jest.Mock).mockResolvedValue(
          mockBusiness,
        );

        const response = await login();
        expect(response.user).toBeDefined();
        expect(response.type_user).toBeDefined();
        expect(response.accessToken).toBeDefined();
        expect(response.business).toBeDefined();
      });

      // should return the user, the access token and store if the user is a merchant
      it('Should return the user, the user type, the access token and store', async () => {
        mockUser.type_user_id = 3;
        (mockUserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
        (mockHashService.compare as jest.Mock).mockResolvedValue(true);
        (mockStoreService.findByCreatorId as jest.Mock).mockResolvedValue(
          mockStore,
        );

        const response = await login();
        expect(response.user).toBeDefined();
        expect(response.type_user).toBeDefined();
        expect(response.accessToken).toBeDefined();
        expect(response.store).toBeDefined();
      });
    });
  });
});
