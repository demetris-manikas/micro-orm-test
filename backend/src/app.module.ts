import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { PostgresUserModule } from './postgresdb/user/user.module';
import { MariaDbUserModule } from './mariadb/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    DatabaseModule,
    PostgresUserModule,
    MariaDbUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
