import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { BusinessModule } from './business/business.module';
import { CurrencyModule } from './currency/currency.module';
import configuration from 'config/configuration';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { Seeder } from './shared/seeders/seed';
import { SeederModule } from './shared/seeders/seeder.module';
import { ConnectionModule } from './connection/connection.module';
import { GroupModule } from './group/group.module';
import { EmailModule } from './shared/email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtOauthGuard } from './auth/guard/jwt-oauth/jwt-oauth.guard';
import { InvitationModule } from './connection/invitation/invitation.module';
import { SessionModule } from './session/session.module';
import { PointsModule } from './points/points.module';
import { EntityTypeModule } from './entity-type/entity-type.module';
import { StoreModule } from './store/store.module';

@Module({
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
        url: configService.get('database.uri'),
        entities: [],
        migrations: ['dist/database/migration/*.js'],
        synchronize: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    BusinessModule,
    CurrencyModule,
    AuthModule,
    SeederModule,
    ConnectionModule,
    GroupModule,
    EmailModule,
    InvitationModule,
    SessionModule,
    PointsModule,
    EntityTypeModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtOauthGuard,
    },
  ],
})
export class AppModule {}
