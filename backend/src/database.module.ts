import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MariaDbDriver } from '@mikro-orm/mariadb';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // contextName: 'postgres',
      useFactory: (configService: ConfigService) => {
        return {
          registerRequestContext: false,
          autoLoadEntities: true,
          driver: PostgreSqlDriver,
          host: configService.get('POSTGRES_HOST'),
          port: +configService.get<number>('POSTGRES_PORT', 5432),
          user: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          dbName: configService.get('POSTGRES_DB'),
        };
      },
    }),

    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      contextName: 'mariadb',
      useFactory: (configService: ConfigService) => {
        return {
          autoLoadEntities: true,
          driver: MariaDbDriver,
          host: configService.get('MARIADB_HOST'),
          port: +configService.get<number>('MARIADB_PORT', 3306),
          user: configService.get('MARIADB_USER'),
          password: configService.get('MARIADB_PASSWORD'),
          dbName: configService.get('MARIADB_DB'),
        };
      },
    }),
  ],
  providers: [],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
