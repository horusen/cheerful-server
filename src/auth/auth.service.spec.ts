import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DataSource, EntityManager, Repository } from 'typeorm';
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
import { FileTypeEnum } from '../file/file_type/file_type.enum';
import { File } from 'src/file/file.entity';
import { createMock } from '@golevelup/ts-jest';
import { OtpService } from './otp/services/otp.service';
import { OtpStatusEnum } from './otp/enums/otp_status.enum';
import { Otp } from './otp/entities/otp.entity';

describe('AuthService', () => {
  let service: AuthService;
  let mockDataSource: DataSource;
  let userSignupDTO: UserSignupDTO;
  let mockUserService: Partial<UsersService>;
  let mockFileService: Partial<FileService>;
  let mockJwtService: Partial<JwtService>;
  let mockBusinessService: Partial<BusinessService>;
  let mockEmailService: Partial<EmailService>;
  let mockInvitationService: Partial<InvitationService>;
  let mockStoreService: Partial<StoreService>;
  let mockHashService: Partial<HashService>;
  let mockOtpService: OtpService;
  let mockUser: User;
  let mockBusiness: Business;
  let mockStore: Store;
  let mockFile: File;
  let mockInvitation: Invitation;
  let mockProfilePic: Express.Multer.File;
  let mockEntityManager: EntityManager;

  const setupMocks = () => {
    mockUser = { id: 1, name: 'John Doe', password: 'password' } as User;
    mockBusiness = { id: 1, name: 'My business' } as Business;
    mockStore = { id: 1, name: 'My store' } as Store;
    mockFile = { id: '1', url: 'https://example.com' } as File;
    mockInvitation = { id: 1, receiver_id: 1 } as Invitation;
    mockProfilePic = {
      buffer: Buffer.from('profile_image_data'),
      originalname: 'profile_image.jpg',
    } as Express.Multer.File;

    mockEntityManager = createMock<EntityManager>();
    mockUserService = createMock<UsersService>();
    mockHashService = createMock<HashService>();
    mockFileService = createMock<FileService>();
    mockInvitationService = createMock<InvitationService>();
    mockJwtService = createMock<JwtService>();
    mockBusinessService = createMock<BusinessService>();
    mockEmailService = createMock<EmailService>();
    mockStoreService = createMock<StoreService>();
    mockOtpService = createMock<OtpService>();
    mockDataSource = createMock<DataSource>({
      transaction: jest.fn().mockImplementation((callback: Function) => {
        callback();
      }),
    });
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
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: OtpService,
          useValue: mockOtpService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    const login = async () => {
      return await service.login(mockUser);
    };

    beforeEach(() => {
      (mockJwtService.sign as jest.Mock).mockReturnValue('accessToken');
    });

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

  describe('Signin', () => {
    let signin = async () => {
      return await service.signin(mockUser.email, mockUser.password);
    };

    it("Should throw an exception if the user doesn't exist", async () => {
      jest.spyOn(mockUserService, 'findByEmail').mockResolvedValue(null);

      try {
        await signin();
        fail('Should throw an exception');
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('User is not found');
      }
    });

    it('Should throw an exception if the password is incorrect', async () => {
      jest.spyOn(mockUserService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(mockHashService, 'compare').mockResolvedValue(false);

      try {
        await signin();
        fail('Should throw an exception');
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Invalid password');
      }
    });

    it('Should signin the user succesfully', async () => {
      jest.spyOn(mockUserService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(mockHashService, 'compare').mockResolvedValue(true);

      const result = await signin();
      expect(result).toEqual(mockUser);
    });
  });

  describe('signup', () => {
    it("Should save the user's profile picture", async () => {
      // Arrange
      (mockFileService.uploadFile as jest.Mock).mockResolvedValue(mockFile);
      const mockEntityManager = createMock<EntityManager>();

      // Act
      await service.saveProfilePic(mockProfilePic, mockEntityManager);

      // Assert
      expect(mockFileService.uploadFile).toBeCalledWith(
        mockProfilePic.buffer,
        mockProfilePic.originalname,
        FileTypeEnum.IMAGE,
        mockEntityManager,
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
        (
          mockUserService.createWithEntityManager as jest.Mock
        ).mockResolvedValue(mockUser);
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
        expect(service.usersService.createWithEntityManager).toBeCalledWith(
          {
            ...userSignupDTO,
            password: 'hashedPassword',
            profile_pic_id: undefined,
          },
          mockEntityManager,
        );

        // Expect to create the business
        expect(service.businessService.createWithEntityManager).toBeCalledWith(
          {
            name: userSignupDTO.business_name,
            creator_id: 1,
          },
          mockEntityManager,
        );

        expect(user).toBeDefined();
      });

      //Should signup the user as Merchant
      it('Should signup the user as Merchant', async () => {
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

        expect(service.dataSource.transaction).toHaveBeenCalled();

        // Expect to upload the profile picture
        expect(service.saveProfilePic).toHaveBeenCalledWith(
          mockProfilePic,
          mockEntityManager,
        );

        // Expect to create the user
        expect(service.usersService.createWithEntityManager).toHaveBeenCalled();

        // Expect to create the store
        expect(service.storeService.createWithEntityManager).toHaveBeenCalled();

        expect(user).toBeDefined();
      });
    });

    it('Should save the user, send the Otp and login', async () => {
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
      const mockOtp = {
        id: 1,
        code: '1234555',
        user_id: mockUser.id,
        otp_status_id: OtpStatusEnum.Pending,
        attempt: 0,
      } as Otp;
      const otpServiceSpy = jest.spyOn(mockOtpService, 'generate');
      const emailServiceSpy = jest.spyOn(mockEmailService, 'sendOTP');

      otpServiceSpy.mockResolvedValue(mockOtp);

      // Act
      const user = await service.signup(userSignupDTO, null);

      // Assert
      expect(user).toBeDefined();
      expect(otpServiceSpy).toHaveBeenCalledWith(mockUser.id);
      expect(emailServiceSpy).toHaveBeenCalledWith(mockUser, mockOtp);
    });
  });
});
