import { Resolver, Mutation, Arg } from 'type-graphql';

import User from '../../../db/entities/User';
import UserToken from '../../../db/entities/UserToken';
import Validate from '../../../util/validatorjs/validateGraphQL';
import MessageError from '../../../util/exceptions/MessageError';

@Resolver()
class ResetPasswordResolver {
  @Mutation(() => String)
  @Validate({
    token: 'required|min:4',
    password: 'required|min:4|confirmed|strict_password',
  })
  async resetPassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    // eslint-disable-next-line no-unused-vars
    @Arg('password_confirm') _: string,
  ): Promise<string> {
    const userToken = await UserToken.findOne({
      where: {
        token,
        type: 'RECOVERY_PASSWORD',
      },
    });
    if (!userToken) {
      throw new MessageError('The token does not exist');
    }

    const expiredAt = new Date(userToken.expiredAt);
    const now = new Date();
    if (expiredAt.getTime() < now.getTime()) {
      throw new MessageError('The token was expired');
    }

    const user = await User.findOne(userToken.userID);
    if (!user) {
      throw new MessageError('The user does not exist');
    }
    user.password = password;
    user.save();

    userToken.usedAt = new Date();
    userToken.save();
    return 'Password updated';
  }
}

export default ResetPasswordResolver;
