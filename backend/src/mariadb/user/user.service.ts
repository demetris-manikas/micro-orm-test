import {
  Injectable,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { InjectEntityManager } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager('mariadb') private readonly em: EntityManager,
  ) {}

}
