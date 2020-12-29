// eslint-disable-next-line max-classes-per-file
import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int, ObjectType,
} from 'type-graphql';

import MessageResponse from '../../../type/MessageResponse';
import MessageType from '../../../type/MessageType.enum';
import User from 'src/db/entities/User';
import UserUpdateEmail from 'src/logic/user/session/UserUpdateEmail';
import roles from 'src/logic/role/role.enum';
import isAuthRolesGraphQL from 'src/util/graphql/isAuthRolesGraphQL';
import Transaction from 'src/util/db/Transaction';

@ObjectType()
class UserUpdateEmailResponse extends MessageResponse(User) {}

@Resolver()
class UserUpdateEmailResolver {
  @Mutation(() => UserUpdateEmailResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userUpdateEmail(
    @Arg('id', () => Int) id: number,
    @Arg('email', () => String) email: string,
  ): Promise<UserUpdateEmailResponse> {
    const user = await User.findOneOrFail(id);
    const updateEmail = new UserUpdateEmail(user);
    await Transaction.run(() => updateEmail.update(email));
    return {
      data: user,
      message: {
        message: __('The item %s was updated', `${id}`),
        type: MessageType.success,
      },
    };
  }
}

export default UserUpdateEmailResolver;
