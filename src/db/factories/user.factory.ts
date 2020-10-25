import * as faker from 'faker';
import { define } from 'typeorm-seeding';

import User from '../entities/User';

const getFakerUser = (password: string = '123456') => {
  const email = `faker@${faker.random.uuid()}.com`;
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  return user;
};

define(User, () => getFakerUser());

export default getFakerUser;
