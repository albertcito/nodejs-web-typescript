// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, UseMiddleware, Arg, Int, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';
import UserUpdatePassword from '../../../logic/user/UserUpdatePassword';
import MessageResponse from '../../type/MessageResponse';

@ObjectType()
class UserUpdatePasswordResponse extends MessageResponse(User) {}

@Resolver()
class UserUpdatePasswordResolver {
  @Mutation(() => UserUpdatePasswordResponse)
  @UseMiddleware(isAuth)
  async userUpdatePassword(
    @Arg('userID', () => Int) userID: number,
    @Arg('password', () => String) password: string,
  ): Promise<UserUpdatePasswordResponse> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${userID}`));
    }
    await (new UserUpdatePassword(user)).update(password);
    return {
      data: user,
      messages: {
        message: __('The item %s was updated', `${userID}`),
        type: 'success',
      },
    };
  }
}

export default UserUpdatePasswordResolver;
