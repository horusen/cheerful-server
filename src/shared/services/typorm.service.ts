import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DBConfig } from './db-config.model';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    // Get the database configuration
    const dbConfig = this.config.getOrThrow<DBConfig>('database');

    return {
      type: 'mysql',
      url: dbConfig.uri,
      entities: [],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      synchronize: dbConfig.synchronize,
      dropSchema: dbConfig.dropSchema,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(), // Replace default TypeORM camel case name for tables and fields in the DB with snake case
    };
  }
}
