import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { InjectEntityManager } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    // @InjectEntityManager('postgres') private readonly em: EntityManager,
    private readonly em: EntityManager,
  ) {}

}
