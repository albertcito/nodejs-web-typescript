import {
  Resolver, Mutation, UseMiddleware, Arg, Int,
} from 'type-graphql';

import UserBasicUpdate from '../../../logic/user/UserBasicUpdate';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';

@Resolver()
class UserBasicUpdateResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async userBasicUpdate(
    @Arg('userID', () => Int) userID: number,
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
  ): Promise<User> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(`The user ${userID} doesn't exists`);
    }
    return (new UserBasicUpdate(user)).update(firstName, lastName);
  }
}

export default UserBasicUpdateResolver;
