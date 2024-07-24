import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([User], 'mariadb'),
  ],
  controllers: [],
  providers: [UserService],
})
export class MariaDbUserModule {}
