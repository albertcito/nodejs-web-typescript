// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, Arg, Int, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import UserBasicUpdate from '~src/logic/user/session/UserBasicUpdate';
import MessageError from '~src/util/exceptions/MessageError';
import User from '~src/db/entities/User';
import roles from '~src/logic/role/role.enum';
import isAuthRolesGraphQL from '~src/util/graphql/isAuthRolesGraphQL';
import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';

@ObjectType()
class UserBasicUpdateResponse extends MessageResponse(User) {}

@Resolver()
class UserBasicUpdateResolver {
  @Mutation(() => UserBasicUpdateResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
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
