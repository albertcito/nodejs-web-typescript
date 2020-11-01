// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, UseMiddleware, Arg, Int, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import UserBasicUpdate from '../../../logic/user/UserBasicUpdate';
import isAuth from '../../../util/graphql/isAuth';
import MessageError from '../../../util/exceptions/MessageError';
import User from '../../../db/entities/User';
import MessageResponse from '../../type/MessageResponse';
import MessageType from '../../type/MessageType.enum';

@ObjectType()
class UserBasicUpdateResponse extends MessageResponse(User) {}

@Resolver()
class UserBasicUpdateResolver {
  @Mutation(() => UserBasicUpdateResponse)
  @UseMiddleware(isAuth)
  async userBasicUpdate(
    @Arg('userID', () => Int) userID: number,
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
  ): Promise<UserBasicUpdateResponse> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(`The user ${userID} doesn't exists`);
    }
    await (new UserBasicUpdate(user)).update(firstName, lastName);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${userID}`),
        type: MessageType.success,
      },
    };
  }
}

export default UserBasicUpdateResolver;
