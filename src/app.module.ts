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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
