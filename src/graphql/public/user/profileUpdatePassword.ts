// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, UseMiddleware, Arg, ObjectType,
} from 'type-graphql';

import Auth from '../../../util/session/Auth';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import UserUpdatePassword from '../../../logic/user/UserUpdatePassword';
import MessageResponse from '../../type/MessageResponse';
import User from '../../../db/entities/User';

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
        type: 'success',
      },
    };
  }
}
