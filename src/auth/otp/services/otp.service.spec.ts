import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { Otp } from '../entities/otp.entity';
import { OtpStatusEnum } from '../enums/otp_status.enum';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as otpGenerator from 'otp-generator';
import { UsersService } from '../../../users/users.service';
import { fail } from 'assert';

describe('OtpService', () => {
  let otpService: OtpService;
  let mockRepo: Partial<Repository<Otp>>;
  let mockUserService: Partial<UsersService>;
  let mockConfigService: Partial<ConfigService>;
  let user = {
    id: 1,
    name: 'test',
  };

  let otp: Otp;
  beforeEach(async () => {
    mockRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    mockUserService = {
      findOne: jest.fn(),
    };

    mockConfigService = {
      getOrThrow: jest.fn().mockReturnValue(5),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        { provide: getRepositoryToken(Otp), useValue: mockRepo },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: UsersService, useValue: mockUserService },
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
        expect(error.message).toBe('Invalid OTP');
      }
    });

    it('Should set the OTP status to verified if OTP code is valid', async () => {
      await verify();
      expect(otp.otp_status_id).toBe(OtpStatusEnum.Verified);
    });

    it('Should return the OTP if the OTP code is valid', async () => {
      expect(await verify()).toBe(otp);
    });
  });

  describe('generate', () => {
    let otp: Otp;
    let generate = async (userId = 1) => {
      return await otpService.generate(userId);
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
    });

    it('Should throw exception if User is not found', async () => {
      (mockUserService.findOne as jest.Mock).mockRejectedValue(
        new HttpException('User not found', 404),
      );
      try {
        await generate();
        fail('Expected HttpException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
        expect(error.message).toBe('User not found');
      }
    });

    it('Should canced the otp record if it exists', async () => {
      (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
      (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
      (mockRepo.findOne as jest.Mock).mockResolvedValue(otp);
      await generate();
      expect(otp.otp_status_id).toBe(OtpStatusEnum.Canceled);
    });

    it('should generate a new otp', async () => {
      otp = {
        ...otp,
        code: 'AB539C899B',
      } as Otp;

      (mockUserService.findOne as jest.Mock).mockResolvedValue(user);
      (mockRepo.findOne as jest.Mock).mockResolvedValue(null);
      (mockRepo.save as jest.Mock).mockResolvedValue(otp);
      const generatedCode = jest.spyOn(otpGenerator, 'generate');
      expect(await generate()).toEqual(otp);
      expect(generatedCode).toHaveBeenCalled();
    });
  });
});
