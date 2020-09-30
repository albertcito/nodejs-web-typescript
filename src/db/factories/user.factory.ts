import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import User from '../entities/User';

define(User, (faker: typeof Faker) => {
  const email = `albertcito@${faker.random.uuid()}.com`;
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = '123456';
  return user;
});
