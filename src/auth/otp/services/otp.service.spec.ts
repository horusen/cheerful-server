import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { Otp } from '../entities/otp.entity';
import { OtpStatusEnum } from '../enums/otp_status.enum';
import { ConfigService } from '@nestjs/config';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as otpGenerator from 'otp-generator';
import { UsersService } from '../../../users/users.service';
import { fail } from 'assert';
import { EmailService } from '../../../shared/email/email.service';
import { createMock } from '@golevelup/ts-jest';

describe('OtpService', () => {
  let otpService: OtpService;
  let mockRepo: Partial<Repository<Otp>>;
  let mockUserService: Partial<UsersService>;
  let mockConfigService: Partial<ConfigService>;
  let mockEmailService: EmailService;
  let mockDataSource: DataSource;
  let mockEntityManager: EntityManager;
  let user = {
    id: 1,
    name: 'test',
  };

  let otp: Otp;
  beforeEach(async () => {
    mockEmailService = createMock<EmailService>();
    mockRepo = createMock<Repository<Otp>>();
    mockUserService = createMock<UsersService>();
    mockConfigService = createMock<ConfigService>();
    mockEntityManager = createMock<EntityManager>();

    type TransactionFunctionMock = (entityManager: EntityManager) => void;
    mockDataSource = createMock<DataSource>({
      transaction: jest
        .fn()
        .mockImplementation((callback: TransactionFunctionMock) => {
          callback(mockEntityManager);
        }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        { provide: getRepositoryToken(Otp), useValue: mockRepo },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: UsersService, useValue: mockUserService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    otpService = module.get<OtpService>(OtpService);
  });

  describe('verify', () => {
    const verify = async (userId = 1, code = '123456') => {
      return await otpService.verify(userId, code);
    };

    beforeEach(() => {
      otp = {
        user_id: 1,
        code: '123456',
        otp_status_id: OtpStatusEnum.Pending,
        // Current date + 10 minutes
        expiry_datetime: new Date(Date.now() + 10 * 60 * 1000),
        attempt: 0,
      } as Otp;

      (mockRepo.findOne as jest.Mock).mockResolvedValue(otp);
    });

    it('should throw exception if OTP record is not found', async () => {
      // Mock repository to return null
      (mockRepo.findOne as jest.Mock).mockResolvedValue(null);

      try {
        // Act
        await verify();

        // Assert
        fail('Expected HttpException to be thrown');
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
        expect(error.message).toBe('OTP not found');
      }
    });

    it('Should increase the number of attempts', async () => {
      (mockRepo.save as jest.Mock).mockResolvedValue(otp);
      await verify();
      expect(otp.attempt).toBe(1);
    });

    it('Should block the OTP when the number of attempts exceeds the maximum', async () => {
      otp.attempt = 5;

      (mockRepo.save as jest.Mock).mockResolvedValue(otp);
      try {
        await verify();
        fail('Expected HttpException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(422);
        expect(error.message).toBe(
          'The OTP has been blocked, too many attempts',
        );
      }
    });

    it('Shoud throw exception if OTP status is Verified', async () => {
      otp.otp_status_id = OtpStatusEnum.Verified;

      try {
        await verify();
        fail('Expected HttpException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(422);
        expect(error.message).toBe('The OTP has been verified');
      }
    });

    it('Should throw an exception if OTP code is invalid', async () => {
      try {
        await verify(1, '2183928');
        fail('Expected HttpException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(422);
        expect(error.message).toBe('Invalid code');
      }
    });

    it('Should set the OTP status to verified if OTP code is valid', async () => {
      await verify();
      expect(otp.otp_status_id).toBe(OtpStatusEnum.Verified);
    });

    it('Should return the OTP if the OTP code is valid', async () => {
      const verification = await verify();
      expect(mockDataSource.transaction).toBeCalledTimes(1);
      expect(mockEntityManager.save).toBeCalled();
      expect(mockUserService.updateWithEntityManager).toBeCalled();
      expect(verification).toBe(otp);
    });
  });

  describe('send', () => {
    let otp: Otp;
    let send = async (userId = 1) => {
      return await otpService.send(userId);
    };

    beforeEach(() => {
      otp = {
        user_id: 1,
        code: '123456',
        otp_status_id: OtpStatusEnum.Pending,
        // Current date + 10 minutes
        expiry_datetime: new Date(Date.now() + 10 * 60 * 1000),
        attempt: 0,
        deleted_at: null,
      } as Otp;
    });

    it('Should throw exception if User is not found', async () => {
      (mockUserService.findOne as jest.Mock).mockRejectedValue(
        new HttpException('User not found', 404),
      );
      try {
        await send();
        fail('Expected HttpException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
        expect(error.message).toBe('User not found');
      }
    });

    it('Should cancel and delete the OTP record if it exists', async () => {
      (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
      (mockRepo.findOne as jest.Mock).mockResolvedValue(otp);
      await send();
      expect(otp.otp_status_id).toBe(OtpStatusEnum.Canceled);
      expect(otp.deleted_at).toBeDefined();
    });

    it('should send a new otp', async () => {
      otp = {
        ...otp,
        code: 'AB539C899B',
      } as Otp;

      (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
      (mockRepo.findOne as jest.Mock).mockResolvedValue(null);
      (mockRepo.save as jest.Mock).mockResolvedValue(otp);
      const emailServiceSpy = jest.spyOn(mockEmailService, 'sendOTP');
      const generatedCodeSpy = jest.spyOn(otpGenerator, 'generate');
      expect(await send()).toEqual(otp);
      expect(emailServiceSpy).toHaveBeenCalled();
      expect(generatedCodeSpy).toHaveBeenCalled();
    });
  });
});
