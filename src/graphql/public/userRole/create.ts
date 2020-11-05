import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import User from '~src/db/entities/User';
import Role from '~src/db/entities/Role';
import MessageError from '~src/util/exceptions/MessageError';
import roles from '~src/logic/role/role.enum';
import isAuthRolesGraphQL from '~src/util/graphql/isAuthRolesGraphQL';

@Resolver()
export default class UserRoleCreateResolver {
  @Mutation(() => String)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userRoleCreate(
    @Arg('userID', () => Int) userID: number,
    @Arg('roleID', () => roles) roleID: roles,
  ): Promise<string> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${user}`));
    }

    const role = await Role.findOne(roleID);
    if (!role) {
      throw new MessageError(__('The item %s does not exists', `${role}`));
    }
    user.roles = [...user.roles, role];
    await user.save();

    return __('The item %s was created', '');
  }
}
