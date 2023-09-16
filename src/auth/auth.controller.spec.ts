import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtOauthGuard } from './guard/jwt-oauth/jwt-oauth.guard';
import { UserSignupDTO } from './dtos/user-signup.dto';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService = createMock<AuthService>();
  let mockUserService = createMock<UsersService>();
  let mockJwtOauthGuard = createMock<JwtOauthGuard>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(JwtOauthGuard)
      .useValue(mockJwtOauthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should contain the public decorator', () => {
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, AuthController)).toBeDefined();
  });

  it('Should signup a new user', async () => {
    const userSignupDTO = createMock<UserSignupDTO>();
    const profilePic = createMock<Express.Multer.File>();
    expect(await controller.signup(userSignupDTO, profilePic)).toBeDefined();
    expect(mockAuthService.signup).toBeCalledWith(userSignupDTO, profilePic);
  });

  it('Should login a user', async () => {
    const request = createMock<Request>();
    expect(await controller.login(request)).toBeDefined();
    expect(mockAuthService.login).toBeCalledWith(request['user']);
  });
});
