// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, UseMiddleware, Arg, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import Auth from '../../../util/session/Auth';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import UserUpdateEmail from '../../../logic/user/UserUpdateEmail';
import MessageResponse from '../../type/MessageResponse';
import User from '../../../db/entities/User';
import MessageType from '../../type/MessageType.enum';

@ObjectType()
class ProfileUpdateEmailResponse extends MessageResponse(User) {}

@Resolver()
export default class ProfileUpdateEmailResolver {
  @Mutation(() => ProfileUpdateEmailResponse)
  @UseMiddleware(isAuth)
  async profileUpdateEmail(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
  ): Promise<ProfileUpdateEmailResponse> {
    const user = Auth.data()?.user;
    if (!user) {
      throw new MessageError(__('The item %s does not exists', ''));
    }
    await (new UserUpdateEmail(user)).update(email, password);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${user.userID}`),
        type: MessageType.success,
      },
    };
  }
}
