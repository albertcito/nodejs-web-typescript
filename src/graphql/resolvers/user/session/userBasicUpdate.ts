// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, Arg, Int, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';
import UserBasicUpdate from '../../../../logic/user/session/UserBasicUpdate';
import MessageError from '../../../../util/exceptions/MessageError';
import User from 'src/db//entities/User';
import roles from '../../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../../util/graphql/isAuthRolesGraphQL';

@ObjectType()
class UserBasicUpdateResponse extends MessageResponse(User) {}

@Resolver()
class UserBasicUpdateResolver {
  @Mutation(() => UserBasicUpdateResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userBasicUpdate(
    @Arg('id', () => Int) id: number,
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
  ): Promise<UserBasicUpdateResponse> {
    const user = await User.findOne(id);
    if (!user) {
      throw new MessageError(`The user ${id} doesn't exists`);
    }
    await (new UserBasicUpdate(user)).update(firstName, lastName);
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${id}`),
        type: MessageType.success,
      },
    };
  }
}

export default UserBasicUpdateResolver;
