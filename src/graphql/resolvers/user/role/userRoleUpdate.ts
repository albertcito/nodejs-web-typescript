import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import MessageField from 'src/graphql/type/MessageField';
import User from 'src/db/entities/User';
import UserRolesUpdate from 'src/logic/user/role/UserRolesUpdate';
import roles from 'src/logic/role/role.enum';
import isAuthRolesGraphQL from 'src/util/graphql/isAuthRolesGraphQL';

@Resolver()
export default class UserRoleUpdateResolver {
  @Mutation(() => MessageField)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userRolesUpdate(
    @Arg('rolesID', () => [String]) rolesID: roles[],
    @Arg('userID', () => Int) userID: number,
  ): Promise<MessageField> {
    const user = await User.findOneOrFail(userID);
    return (new UserRolesUpdate(user)).save(rolesID);
  }
}
