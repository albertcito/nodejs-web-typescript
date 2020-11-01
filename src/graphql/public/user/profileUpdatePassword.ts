import {
  Resolver, Mutation, UseMiddleware, Arg,
} from 'type-graphql';

import Auth from '../../../util/session/Auth';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';
import UserUpdatePassword from '../../../logic/user/UserUpdatePassword';

@Resolver()
export default class ProfileUpdatePasswordResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async profileUpdatePassword(
    @Arg('password', () => String) password: string,
    @Arg('newPassword', () => String) newPassword: string,
  ): Promise<User> {
    const user = Auth.data()?.user;
    if (!user) {
      throw new MessageError('The user does not exists');
    }
    const updatePassword = new UserUpdatePassword(user);
    await updatePassword.update(newPassword, password);
    return user;
  }
}
