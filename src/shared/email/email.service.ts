import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from 'crypto-js';
import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class EmailService {
  constructor(
    public emailService: MailerService,
    public configService: ConfigService,
  ) {}

  sendConfirmationEmail(user: User, token: string) {
    const confirmationUrl = `${this.configService.get(
      'FRONTEND_URL',
    )}/auth/confirm?token=${token}`;

    this.emailService.sendMail({
      to: user.email,
      subject: 'Welcome to Cheerful. Verify your email address.',
      template: './confirmation-email',
      context: {
        name: user.name,
        confirmation_url: confirmationUrl,
      },
    });
  }

  sendInvitationtionEmail(
    sender: User | Business,
    receiver_name: string,
    receiver_email_address: string,
    invitationId: number,
  ) {
    const queryParams =
      `email=${receiver_email_address}&name=${receiver_name}&invitation=${invitationId}`.replace(
        ' ',
        '+',
      );

    // TODO: encrypt the URL before sending it to the frontend

    const registrationUrl = `${this.configService.get(
      'FRONTEND_URL',
    )}/authentication/join?${queryParams}`;

    this.emailService.sendMail({
      to: receiver_email_address,
      subject: `${sender.name} invites you to join Cheerful`,
      template: './invitation-email',
      context: {
        receiver_name,
        receiver_email_address,
        sender,
        registration_url: registrationUrl,
      },
    });
  }
}
