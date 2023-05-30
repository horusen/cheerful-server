import { JwtOauthGuard } from './jwt-oauth.guard';

describe('JwtOauthGuard', () => {
  it('should be defined', () => {
    expect(new JwtOauthGuard()).toBeDefined();
  });
});
