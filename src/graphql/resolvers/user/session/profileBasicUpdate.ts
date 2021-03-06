// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, UseMiddleware, Arg, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageResponse from 'src/graphql/type/MessageResponse';
import MessageType from 'src/graphql/type/MessageType.enum';
import UserBasicUpdate from 'src/logic/user/session/UserBasicUpdate';
import isAuth from 'src/util/graphql/isAuth';
import Auth from 'src/util/session/Auth';
import User from 'src/db/entities/User';

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
    const { user } = Auth.session();
    await (new UserBasicUpdate(user)).update(firstName, lastName);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${user.id}`),
        type: MessageType.success,
      },
    };
  }
}
