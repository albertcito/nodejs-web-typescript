// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, UseMiddleware, Arg, ObjectType,
} from 'type-graphql';

import Auth from '~src/util/session/Auth';
import isAuth from '~src/util/graphql/isAuth';
import MessageError from '~src/util/exceptions/MessageError';
import UserUpdatePassword from '~src/logic/user/session/UserUpdatePassword';
import User from '~src/db/entities/User';
import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';

@ObjectType()
class ProfileUpdatePasswordResponse extends MessageResponse(User) {}

@Resolver()
export default class ProfileUpdatePasswordResolver {
  @Mutation(() => ProfileUpdatePasswordResponse)
  @UseMiddleware(isAuth)
  async profileUpdatePassword(
    @Arg('password', () => String) password: string,
    @Arg('newPassword', () => String) newPassword: string,
  ): Promise<ProfileUpdatePasswordResponse> {
    const user = Auth.data()?.user;
    if (!user) {
      throw new MessageError(__('The item %s does not exists', ''));
    }
    const updatePassword = new UserUpdatePassword(user);
    await updatePassword.update(newPassword, password);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', ''),
        type: MessageType.success,
      },
    };
  }
}
