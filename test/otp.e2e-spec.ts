import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { setupApp } from '../src/app-config';
import { Otp } from '../src/auth/otp/entities/otp.entity';
import { OtpStatusEnum } from '../src/auth/otp/enums/otp_status.enum';
import { OtpModule } from '../src/auth/otp/otp.module';

describe('OTP', () => {
  let app: INestApplication;
  let otpRepository: Repository<Otp>;
  let userRepository: Repository<Otp>;
  let otp = {
    user_id: 1,
    code: '123456',
    otp_status_id: OtpStatusEnum.Pending,
    expiry_datetime: new Date(Date.now() + 10 * 60 * 1000),
  };
  let createOtp = async (_otp = otp) => {
    const newOtp = Object.assign(new Otp(), _otp);
    return await otpRepository.save(newOtp);
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          cache: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            url: 'mysql://root@localhost:3306/cheerful-test',
            entities: [],
            migrations: ['dist/database/migration/*.js'],
            synchronize: true,
            dropSchema: true,
            autoLoadEntities: true,
            namingStrategy: new SnakeNamingStrategy(),
          }),
          inject: [ConfigService],
          dataSourceFactory: async (options) => {
            const dataSource = await new DataSource(options).initialize();
            return dataSource;
          },
        }),
        OtpModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    otpRepository = moduleFixture.get(getRepositoryToken(Otp));
    userRepository = moduleFixture.get(getRepositoryToken(User));

    await app.init();
  });

  afterEach(async () => {
    await otpRepository.delete({});
    await userRepository.delete({});
  });

  describe('generate', () => {
    it('The user should be able to generate OTP', async () => {
      const user = {
        name: 'Omar',
        email: 'WtQ3t@example.com',
        type_user_id: 1,
      } as User;

      await userRepository.save(user);
      const response = await request(app.getHttpServer()).get(
        '/api/v1/otp/generate/1',
      );
      expect(response.status).toBe(200);
    });

    it("The user shouldn't be able to generate OTP if the user doesn't exist", async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/v1/otp/generate/156',
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('verify', () => {
    beforeEach(async () => {
      await createOtp();
    });
    it('The request should be rejected a user_id is not provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/otp/verify')
        .send({
          code: '123456',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toStrictEqual([
        'userId should not be empty',
      ]);
    });

    it('The request should be rejected a code is not provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/otp/verify')
        .send({
          userId: 1,
        });
      expect(response.status).toBe(400);
    });

    it('The user should be able to verify OTP', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/otp/verify')
        .send({
          userId: 1,
          code: '123456',
        });
      expect(response.status).toBe(201);
      // expect(response.body.message).toBe('OTP verified successfully');
    });

    it("The user shouldn't be able to verify OTP if the given code is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/otp/verify')
        .send({
          userId: 1,
          code: '12345676',
        });
      expect(response.status).toBe(422);
    });
  });
});
