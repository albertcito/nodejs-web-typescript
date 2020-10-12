import { Resolver, Mutation, Arg } from 'type-graphql';
import argon2 from 'argon2';

import User from '../../../db/entities/User';
import UserToken from '../../../db/entities/UserToken';
import Validate from '../../../util/validatorjs/validateGraphQL';
import MessageError from '../../../util/exceptions/MessageError';

@Resolver()
class ForgotPasswordResolver {
  @Mutation(() => String)
  @Validate({ email: 'required|email' })
  async forgotPassword(@Arg('email') email: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new MessageError(`The email: "${email}" doesn't exist`);
    }
    const userToken = new UserToken();
    userToken.userID = user.userID;
    userToken.token = await argon2.hash('signature');
    userToken.type = 'RECOVERY_PASSWORD';
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 6);
    userToken.expiredAt = expiredAt;
    userToken.save();
    return 'Please, review your email';
  }
}

export default ForgotPasswordResolver;
