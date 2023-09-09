import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { createMock } from '@golevelup/ts-jest';
import { User } from '../../users/users.entity';
import { Otp } from '../../auth/otp/entities/otp.entity';
import { InternalServerErrorException } from '@nestjs/common';

describe('EmailService', () => {
  let service: EmailService;
  let mockConfigService: ConfigService;
  let mockEmailService: MailerService;

  const setupMocks = () => {
    mockConfigService = createMock<ConfigService>();
    mockEmailService = createMock<MailerService>();
  };

  beforeEach(async () => {
    setupMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: mockEmailService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Send OTP', () => {
    const mockUser = createMock<User>({
      id: 1,
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
    });

    const mockOtp = createMock<Otp>({
      id: 1,
      code: '12345',
    });

    const sentOtp = async () => {
      return await service.sendOTP(mockUser, mockOtp);
    };
    it('Should throw an exception if the email sending fail', async () => {
      // jest.spyOn(mockEmailService, 'sendMail').mockRejectedValue(new Error());
      (mockEmailService.sendMail as jest.Mock).mockRejectedValue(new Error());

      try {
        await sentOtp();
        fail('Should throw an exception');
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Error sending OTP email');
      }
    });

    it('Should send the email successfully', async () => {
      const spy = jest.spyOn(mockEmailService, 'sendMail');
      await sentOtp();
      expect(spy).toBeCalledWith({
        to: mockUser.email,
        subject: 'Verification code',
        template: './otp-email.ejs',
        context: {
          mockUser,
          mockOtp,
        },
      });
    });
  });
});
