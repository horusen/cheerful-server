import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as otpGenerator from 'otp-generator';
import { DataSource, Repository } from 'typeorm';
import { EmailService } from '../../../shared/email/email.service';
import { UsersService } from '../../../users/users.service';
import { Otp } from '../entities/otp.entity';
import { OtpStatusEnum } from '../enums/otp_status.enum';
import { User } from './../../../users/users.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly _repo: Repository<Otp>,
    public dataSource: DataSource,
    public userService: UsersService,
    public configService: ConfigService,
    public emailService: EmailService,
  ) {}

  /**
   * verify the OTP for a user
   *
   * @param userId - The ID of the user
   * @param code - The OTP code to be verified
   * @returns True if the OTP is valid, otherwise throws an exception
   */
  async verify(userId: number, code: string) {
    const otp = await this.findOtpRecord(userId);
    this.incrementAttempt(otp);

    const maxAttempts = 5;
    this.checkMaxAttempts(otp, maxAttempts);

    this.checkExpiration(otp);

    this.checkOtpStatus(otp);

    await this.verifyOtp(otp, code);

    this.dataSource.transaction(async (transactionalEntityManager) => {
      otp.otp_status_id = OtpStatusEnum.Verified;
      await transactionalEntityManager.save(otp);

      await this.userService.updateWithEntityManager(
        userId,
        { verified: true },
        transactionalEntityManager,
      );
    });

    return otp;
  }

  /**
   * Generate a new OTP for a given user and send it via email.
   * If there is an existing OTP for the user, it will be canceled.
   * @param userId - The ID of the user.
   * @returns The generated OTP.
   */
  async send(userId: number): Promise<Otp> {
    // Check if the user exists
    let user: User;
    try {
      user = await this.userService.findOne(userId);
    } catch (error) {
      throw new HttpException('User not found', 404);
    }

    // verify if there is an existing OTP for the user
    const existingOtp = await this._repo.findOne({
      where: { user_id: userId, otp_status_id: OtpStatusEnum.Pending },
    });

    // If there is an existing OTP, cancel it
    if (existingOtp) {
      existingOtp.otp_status_id = OtpStatusEnum.Canceled;
      await this._repo.save(existingOtp);
      await this._repo.softRemove(existingOtp);
    }

    // Generate a new OTP
    const generatedCode = otpGenerator.generate(10, {
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const newOtp = await this._repo.save({
      user_id: userId,
      code: generatedCode,
      otp_status_id: OtpStatusEnum.Pending,
      expiry_datetime: new Date(Date.now() + 10 * 60 * 1000),
    });

    await this.emailService.sendOTP(user, newOtp);

    return newOtp;
  }

  // Helper function to find the OTP record for the user
  private async findOtpRecord(userId: number): Promise<Otp> {
    const otp = await this._repo.findOne({
      where: { user_id: userId },
    });
    if (!otp) {
      throw new HttpException('OTP not found', 404);
    }
    return otp;
  }

  // Helper function to increment the attempt counter and save the OTP record
  private async incrementAttempt(otp: Otp): Promise<void> {
    otp.attempt++;
    await this._repo.save(otp);
  }

  // Helper function to check if the number of attempts exceeds the maximum allowed
  private checkMaxAttempts(otp: Otp, maxAttempts: number): void {
    if (otp.attempt > maxAttempts) {
      otp.otp_status_id = OtpStatusEnum.Blocked;
      this._repo.save(otp);
      throw new HttpException(
        'The OTP has been blocked, too many attempts',
        422,
      );
    }
  }

  // Helper function to check if the OTP has expired
  private checkExpiration(otp: Otp): void {
    if (otp.expiry_datetime < new Date()) {
      otp.otp_status_id = OtpStatusEnum.Expired;
      this._repo.save(otp);
      throw new HttpException('The OTP has expired', 422);
    }
  }

  // Helper function to check the status of the OTP and throw exceptions accordingly
  private checkOtpStatus(otp: Otp): void {
    switch (otp.otp_status_id) {
      case OtpStatusEnum.Verified:
        throw new HttpException('The OTP has been verified', 422);
      case OtpStatusEnum.Expired:
        throw new HttpException('The OTP has expired', 422);
      case OtpStatusEnum.Blocked:
        throw new HttpException('The OTP has been blocked', 422);
      case OtpStatusEnum.Canceled:
        throw new HttpException('The OTP has been canceled', 422);
    }
  }

  // Helper function to compare the provided OTP code with the stored code
  private async verifyOtp(otp: Otp, code: string): Promise<void> {
    const isValidOtp = otp.code === code;
    if (!isValidOtp) {
      throw new HttpException('Invalid code', 422);
    }
  }
}
