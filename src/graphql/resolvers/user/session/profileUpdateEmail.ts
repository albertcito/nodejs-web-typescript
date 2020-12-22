// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, UseMiddleware, Arg, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';
import Auth from 'src/util/session/Auth';
import isAuth from 'src/util/graphql/isAuth';
import UserUpdateEmail from '../../../../logic/user/session/UserUpdateEmail';
import User from 'src/db/entities/User';

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
    const { user } = Auth.session();
    await (new UserUpdateEmail(user)).update(email, password);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${user.id}`),
        type: MessageType.success,
      },
    };
  }
}
