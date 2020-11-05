import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import User from '../../../db/entities/User';
import Role from '../../../db/entities/Role';
import MessageError from '../../../util/exceptions/MessageError';
import roles from '../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../util/graphql/isAuthRolesGraphQL';

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
    user.roles = [role];
    await user.save();

    return __('The item %s was created', '');
  }
}
