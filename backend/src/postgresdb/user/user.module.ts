import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([User], 'postgres'),
    // MikroOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [UserService],
})
export class PostgresUserModule {}
