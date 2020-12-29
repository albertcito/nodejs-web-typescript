// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Mutation, Arg, Int, ObjectType,
} from 'type-graphql';
import { __ } from 'i18n';

import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';
import User from 'src/db/entities/User';
import UserUpdatePassword from 'src/logic/user/session/UserUpdatePassword';
import roles from 'src/logic/role/role.enum';
import isAuthRolesGraphQL from 'src/util/graphql/isAuthRolesGraphQL';
import Transaction from 'src/util/db/Transaction';

@ObjectType()
class UserUpdatePasswordResponse extends MessageResponse(User) {}

@Resolver()
class UserUpdatePasswordResolver {
  @Mutation(() => UserUpdatePasswordResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userUpdatePassword(
    @Arg('id', () => Int) id: number,
    @Arg('password', () => String) password: string,
  ): Promise<UserUpdatePasswordResponse> {
    const user = await User.findOneOrFail(id);
    await Transaction.run(() => (new UserUpdatePassword(user)).update(password));
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${id}`),
        type: MessageType.success,
      },
    };
  }
}

export default UserUpdatePasswordResolver;
