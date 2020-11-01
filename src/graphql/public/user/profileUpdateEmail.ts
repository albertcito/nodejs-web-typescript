import {
  Resolver, Mutation, UseMiddleware, Arg,
} from 'type-graphql';

import Auth from '../../../util/session/Auth';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';
import UserUpdateEmail from '../../../logic/user/UserUpdateEmail';

@Resolver()
export default class ProfileUpdateEmailResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async profileUpdateEmail(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
  ): Promise<User> {
    const user = Auth.data()?.user;
    if (!user) {
      throw new MessageError('The user session does not exists');
    }
    const updateEmail = new UserUpdateEmail(user);
    await updateEmail.update(email, password);
    return user;
  }
}
