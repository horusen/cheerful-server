import { LocalOauthGuard } from './local-oauth.guard';

describe('LocalOauthGuard', () => {
  it('should be defined', () => {
    expect(new LocalOauthGuard()).toBeDefined();
  });
});
