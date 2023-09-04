import { Test, TestingModule } from '@nestjs/testing';
import { OtpController } from './otp.controller';
import { OtpService } from './services/otp.service';
import { verifyOtpDto } from './dtos/verify-otp.dto';
import { Otp } from './entities/otp.entity';
import { OtpStatusEnum } from './enums/otp_status.enum';

describe('OtpController', () => {
  let controller: OtpController;
  let otpService: OtpService;
  let userId: number;
  let otp: Otp;
  let otpVerifyDto: verifyOtpDto;

  beforeEach(async () => {
    const mockOtpService = {
      generate: jest.fn(),
      verify: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [
        {
          provide: OtpService,
          useValue: mockOtpService,
        },
      ],
    }).compile();

    controller = module.get<OtpController>(OtpController);
    otpService = module.get<OtpService>(OtpService);
    userId = 1;
    otp = {
      user_id: 1,
      code: '123456',
      otp_status_id: OtpStatusEnum.Pending,
    } as Otp;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generate', () => {
    it('should generate an OTP for a user', async () => {
      // Mock the generate method of the OtpService
      (otpService.generate as jest.Mock).mockResolvedValue(otp);
      const result = await controller.generate(userId);

      expect(result).toBe(otp);
    });
  });

  describe('verify', () => {
    it('should verify an OTP for a user', async () => {
      otpVerifyDto = {
        userId: 1,
        code: '123456',
      };

      // Mock the verify method of the OtpService
      (otpService.verify as jest.Mock).mockResolvedValue(otp);

      const result = await controller.verify(otpVerifyDto);

      expect(result).toEqual(otp);
    });
  });
});
