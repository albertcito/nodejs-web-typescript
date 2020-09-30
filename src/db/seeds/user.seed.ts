import { Factory, Seeder } from 'typeorm-seeding';

import User from '../entities/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(10);
  }
}
