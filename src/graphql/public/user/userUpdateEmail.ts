import {
  Resolver, Mutation, UseMiddleware, Arg, Int,
} from 'type-graphql';

import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';
import UserUpdateEmail from '../../../logic/user/UserUpdateEmail';

@Resolver()
class UserUpdateEmailResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async userUpdateEmail(
    @Arg('userID', () => Int) userID: number,
    @Arg('email', () => String) email: string,
  ): Promise<User> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(`The user ${userID} doesn't exists`);
    }
    const updateEmail = new UserUpdateEmail(user);
    await updateEmail.update(email);
    return user;
  }
}

export default UserUpdateEmailResolver;
