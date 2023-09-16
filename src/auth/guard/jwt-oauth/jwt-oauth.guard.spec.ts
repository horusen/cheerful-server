import { createMock } from '@golevelup/ts-jest';
import { JwtOauthGuard } from './jwt-oauth.guard';
import { ConfigService } from '@nestjs/config';
import { SessionService } from '../../../session/session.service';
import { Reflector } from '@nestjs/core';

describe('JwtOauthGuard', () => {
  const mockConfigService = createMock<ConfigService>();
  const mockSessionService = createMock<SessionService>();
  const mockReflector = createMock<Reflector>();
  it('should be defined', () => {
    expect(
      new JwtOauthGuard(mockConfigService, mockSessionService, mockReflector),
    ).toBeDefined();
  });
});
