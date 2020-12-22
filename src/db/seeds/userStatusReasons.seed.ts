import * as faker from 'faker';
import { Factory, Seeder } from 'typeorm-seeding';

import User from '../entities/User';
import userStatusEnum from '../../logic/userStatus/userStatus.enum';
import UserStatusReason from '../entities/UserStatusReason';

const createUserStatusReasons = async (userID: number, userStatusID: userStatusEnum) => {
  const reason = new UserStatusReason();
  reason.userID = userID;
  reason.userStatusID = userStatusID;
  reason.reason = faker.hacker.phrase();
  await reason.save();
  return reason;
};

const createManyReasons = async (userID: number, many = 20) => {
  const promises = [];
  for (let index = 0; index < many; index += 1) {
    const status = (many % 2) ? userStatusEnum.active : userStatusEnum.inactive;
    promises.push(createUserStatusReasons(userID, status));
  }
  await Promise.all(promises);
};

export default class CreateUsersStatusReason implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const users = await factory(User)().createMany(50);
    const promises: Promise<void>[] = [];
    users.forEach(async (user: User) => {
      promises.push(createManyReasons(user.id));
    });
    await Promise.all(promises);
  }
}
