import {
  Resolver, Query, UseMiddleware, Arg, Int,
} from 'type-graphql';

import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';

@Resolver()
class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async user(
    @Arg('userID', () => Int, { defaultValue: 1, nullable: true }) userID: number,
  ): Promise<User> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(`The lang ${userID} doesn't exists`);
    }
    return user;
  }
}

export default UserResolver;
