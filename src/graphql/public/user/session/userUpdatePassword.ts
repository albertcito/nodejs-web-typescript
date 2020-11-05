// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, Arg, Int, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageError from '../../../../util/exceptions/MessageError';
import User from '../../../../db/entities/User';
import UserUpdatePassword from '../../../../logic/user/session/UserUpdatePassword';
import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';
import roles from '../../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../../util/graphql/isAuthRolesGraphQL';

@ObjectType()
class UserUpdatePasswordResponse extends MessageResponse(User) {}

@Resolver()
class UserUpdatePasswordResolver {
  @Mutation(() => UserUpdatePasswordResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
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
      message: {
        message: __('The item %s was updated', `${userID}`),
        type: MessageType.success,
      },
    };
  }
}

export default UserUpdatePasswordResolver;
