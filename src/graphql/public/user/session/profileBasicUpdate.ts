// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, UseMiddleware, Arg, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import UserBasicUpdate from '../../../../logic/user/session/UserBasicUpdate';
import isAuth from '../../../../util/graphql/isAuth';
import Auth from '../../../../util/session/Auth';
import MessageError from '../../../../util/exceptions/MessageError';
import User from '../../../../db/entities/User';
import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';

@ObjectType()
class ProfileBasicUpdateResponse extends MessageResponse(User) {}

@Resolver()
export default class ProfileBasicUpdateResolver {
  @Mutation(() => ProfileBasicUpdateResponse)
  @UseMiddleware(isAuth)
  async profileBasicUpdate(
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
  ): Promise<ProfileBasicUpdateResponse> {
    const user = Auth.data()?.user;
    if (!user) {
      throw new MessageError(__('The item %s does not exists', ''));
    }
    await (new UserBasicUpdate(user)).update(firstName, lastName);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${user.userID}`),
        type: MessageType.success,
      },
    };
  }
}
