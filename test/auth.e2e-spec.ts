import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import configuration from '../config/configuration';
import { mockInvitation } from '../mocks/invitation.mock';
import { mockUser } from '../mocks/user.mock';
import { setupApp } from '../src/app-config';
import { AuthModule } from '../src/auth/auth.module';
import { Otp } from '../src/auth/otp/entities/otp.entity';
import { Business } from '../src/business/entities/business.entity';
import { Invitation } from '../src/connection/invitation/invitation.entity';
import { TypeOrmConfigService } from '../src/shared/services/typorm.service';
import { Store } from '../src/store/entities/store.entity';
import { TypeUserEnum } from '../src/users/type-users/type-user.enum';
import { User } from '../src/users/users.entity';
import { OtpStatusEnum } from '../src/auth/otp/enums/otp_status.enum';
import { HashService } from '../src/shared/services/hash/hash.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let businessRepository: Repository<Business>;
  let otpRepository: Repository<Otp>;
  let invitationRepository: Repository<Invitation>;
  let storeRepository: Repository<Store>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          cache: true,
          envFilePath: ['.env.test'],
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);

    userRepository = moduleFixture.get(getRepositoryToken(User));
    otpRepository = moduleFixture.get(getRepositoryToken(Otp));
    businessRepository = moduleFixture.get(getRepositoryToken(Business));
    invitationRepository = moduleFixture.get(getRepositoryToken(Invitation));
    storeRepository = moduleFixture.get(getRepositoryToken(Store));

    await app.init();
  });

  describe('signup', () => {
    it("The user's request should be validated", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual([
        'name should not be empty',
        'country_id should not be empty',
        'type_user_id should not be empty',
        'type_user_id must be one of the following values: 1, 2, 3',
        'phone_number should not be empty',
        'email must be an email',
        'email should not be empty',
        'password should not be empty',
      ]);
    });

    it("An otp should be sent to the user's email", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          name: 'Shikamaru',
          country_id: 1,
          email: 'WtQ3t2@example.com',
          phone_number: '+22133485948',
          password: '123456',
          password_confirmation: '123456',
          type_user_id: TypeUserEnum.BusinessAdmin,
          business_name: 'Ginger',
        });

      const otp = await otpRepository.findOne({
        where: { user_id: mockUser.id, otp_status_id: OtpStatusEnum.Pending },
      });

      expect(otp).toBeDefined();

      expect(response.status).toBe(201);
    });

    it('The user should be able to signup as individual', async () => {
      const user = mockUser;

      // Create a business
      const businessAdmin = await userRepository.save({
        ...user,
        type_user_id: TypeUserEnum.BusinessAdmin,
      });
      const business = await businessRepository.save({
        name: 'My business',
        creator_id: businessAdmin.id,
      });

      // Create a user
      const individual = await userRepository.save({
        email: 'WtQ3t2@example.com',
        type_user_id: TypeUserEnum.Individual,
      });

      // Invite the user
      await invitationRepository.save({
        ...mockInvitation,
        sender_business_id: business.id,
        receiver_id: individual.id,
      });

      // Signup as a new user
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          ...individual,
          ...mockUser,
          gender_id: 1,
          phone_number: '+22133485948',
          password_confirmation: user.password,
          invitation_id: 1,
        });

      // Expect the user to be created
      expect(response.status).toBe(201);
    });

    it('The user should be able to signup as business admin', async () => {
      // Register as a user
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          name: 'Shikamaru',
          country_id: 1,
          email: 'WtQ3t2@example.com',
          phone_number: '+22133485948',
          password: '123456',
          password_confirmation: '123456',
          type_user_id: TypeUserEnum.BusinessAdmin,
          business_name: 'Ginger',
        });

      // Get the business created in consequence to the registration of the user
      const business = await businessRepository.findOne({
        where: { name: 'Ginger' },
      });

      // Expect the user to be created
      expect(response.status).toBe(201);
      // Except a business to be created as a consequence of the user's registration
      expect(business).toBeDefined();
    });

    it('The user should be able to signup as Merchant', async () => {
      // Register as a user as merchant
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          name: 'Shikamaru',
          country_id: 1,
          email: 'WtQ3t2@example.com',
          phone_number: '+22133485948',
          password: '123456',
          password_confirmation: '123456',
          type_user_id: TypeUserEnum.Merchant,
          store_name: 'Lona',
        });

      // Get the store created in consequence to the registration of the user
      const store = await storeRepository.findOne({
        where: { name: 'Lona' },
      });

      // Expect the user to be created
      expect(response.status).toBe(201);
      // Expect a store to be created as a consequence of the user's registration
      expect(store).toBeDefined();
    });
  });

  describe.only('login', () => {
    const url = '/api/v1/auth/login';
    it("Should validate user's request", async () => {
      const response = await request(app.getHttpServer()).post(url).send({});

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });

    it('The user should be able to login as individual', async () => {
      await userRepository.save({
        ...mockUser,
        password: await new HashService().hash(mockUser.password),
        type_user_id: TypeUserEnum.Individual,
      });
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ email: mockUser.email, password: mockUser.password });
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.user).toBeDefined();
    });

    it('The user should be able to login as business admin', async () => {
      const businessAdmin = await userRepository.save({
        ...mockUser,
        password: await new HashService().hash(mockUser.password),
        type_user_id: TypeUserEnum.BusinessAdmin,
      });

      await businessRepository.save({
        name: 'My business',
        creator_id: businessAdmin.id,
      });

      const response = await request(app.getHttpServer())
        .post(url)
        .send({ email: mockUser.email, password: mockUser.password });

      expect(response.status).toBe(200);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.business).toBeDefined();
    });

    it.only('The user should be able to login as merchant', async () => {
      const merchant = await userRepository.save({
        ...mockUser,
        password: await new HashService().hash(mockUser.password),
        type_user_id: TypeUserEnum.Merchant,
      });

      await storeRepository.save({
        name: 'My store',
        creator_id: merchant.id,
      });

      const response = await request(app.getHttpServer())
        .post(url)
        .send({ email: mockUser.email, password: mockUser.password });

      expect(response.status).toBe(200);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.store).toBeDefined();
    });
  });
});
