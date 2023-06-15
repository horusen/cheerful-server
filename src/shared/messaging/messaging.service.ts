import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class MessagingService {
  private _client: Twilio;

  constructor(public configService: ConfigService) {
    this._client = new Twilio(
      this.configService.getOrThrow('twilio.accountSid'),
      this.configService.getOrThrow('twilio.authToken'),
    );
  }

  sendWhatsappTextMessage(message: string) {
    this._sendTextMessage('whatsapp:', message);
  }

  sendWhatsappMediaMessage(mediaUrl: string, message: string = '') {
    this._sendMediaMessage('whatsapp:', mediaUrl, message);
  }

  private _sendTextMessage(prefix: string, message: string) {
    if (!prefix) prefix = '';
    this._client.messages.create({
      to: prefix + this.configService.getOrThrow('twilio.personalPhoneNumber'),
      from: prefix + this.configService.getOrThrow('twilio.twilioPhoneNumber'),
      body: message,
    });
  }

  private _sendMediaMessage(
    prefix: string,
    mediaUrl: string,
    message: string = '',
  ) {
    if (!prefix) prefix = '';
    this._client.messages.create({
      to: prefix + this.configService.getOrThrow('twilio.personalPhoneNumber'),
      from: prefix + this.configService.getOrThrow('twilio.twilioPhoneNumber'),
      mediaUrl: [mediaUrl],
      body: message,
    });
  }
}
