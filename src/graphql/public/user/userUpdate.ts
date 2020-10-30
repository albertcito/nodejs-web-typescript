import {
  Resolver, Mutation, UseMiddleware, Arg, Int,
} from 'type-graphql';

import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';

@Resolver()
class UserUpdateResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async userUpdate(
    @Arg('userID', () => Int) userID: number,
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
  ): Promise<User> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(`The user ${userID} doesn't exists`);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return user;
  }
}

export default UserUpdateResolver;
