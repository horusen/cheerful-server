import { HttpException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Otp } from '../entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpStatusEnum } from '../enums/otp_status.enum';
import { ConfigService } from '@nestjs/config';
import { HashService } from 'src/shared/services/hash/hash.service';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly _repo: Repository<Otp>,
    public configService: ConfigService,
  ) {}

  /**
   * verify the OTP for a user
   *
   * @param userId - The ID of the user
   * @param code - The OTP code to be verified
   * @returns True if the OTP is valid, otherwise throws an exception
   */
  async verify(userId: number, code: string) {
    // Step 1: Find the OTP record for the user
    const otp = await this.findOtpRecord(userId);

    // Step 2: Increment the attempt counter and save the OTP record
    this.incrementAttempt(otp);

    // Step 3: Check if the number of attempts exceeds the maximum allowed
    const maxAttempts = 5; // You can retrieve this from configuration if needed
    this.checkMaxAttempts(otp, maxAttempts);

    // Step 4: Check if the OTP has expired
    this.checkExpiration(otp);

    // Step 5: Check the status of the OTP and throw exceptions accordingly
    this.checkOtpStatus(otp);

    // Step 6: Compare the provided OTP code with the stored code
    await this.verifyOtp(otp, code);

    // Step 7: Set the OTP status to Verified and return the OTP object
    await this.setOtpStatusVerified(otp);

    return otp;
  }

  /**
   * Generate a new OTP for a given user.
   * If there is an existing OTP for the user, it will be canceled.
   * @param userId - The ID of the user.
   * @returns The generated OTP.
   */
  async generate(userId: number): Promise<Otp> {
    // verify if there is an existing OTP for the user
    const existingOtp = await this._repo.findOne({
      where: { user_id: userId, otp_status_id: OtpStatusEnum.Pending },
    });

    // If there is an existing OTP, cancel it
    if (existingOtp) {
      existingOtp.otp_status_id = OtpStatusEnum.Canceled;
      await this._repo.save(existingOtp);
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

    return newOtp;
  }

  // Helper function to find the OTP record for the user
  private async findOtpRecord(userId: number): Promise<Otp> {
    const otp = await this._repo.findOne({
      where: { user_id: userId, otp_status_id: OtpStatusEnum.Pending },
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
      throw new HttpException('Invalid OTP', 422);
    }
  }

  // Helper function to set the OTP status to Verified and return the OTP object
  private async setOtpStatusVerified(otp: Otp): Promise<void> {
    otp.otp_status_id = OtpStatusEnum.Verified;
    await this._repo.save(otp);
  }
}
