import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import User from '~src/db/entities/User';
import MessageError from '~src/util/exceptions/MessageError';
import UserRolesUpdate from '~src/logic/user/role/UserRolesUpdate';
import roles from '~src/logic/role/role.enum';

@Resolver()
export default class UserRoleUpdateResolver {
  @Mutation(() => String)
  async userRolesUpdate(
    @Arg('rolesID', () => [String]) rolesID: roles[],
    @Arg('userID', () => Int) userID: number,
  ): Promise<string> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${user}`));
    }
    return (new UserRolesUpdate(user)).save(rolesID);
  }
}
