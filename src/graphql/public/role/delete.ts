import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg,
} from 'type-graphql';

import Role from '~src/db/entities/Role';
import MessageError from '~src/util/exceptions/MessageError';
import roles from '~src/logic/role/role.enum';
import isAuthRolesGraphQL from '~src/util/graphql/isAuthRolesGraphQL';

@Resolver()
export default class RoleDeleteResolver {
  @Mutation(() => String)
  @isAuthRolesGraphQL([roles.superAdmin])
  async roleDelete(
    @Arg('roleID', () => roles) roleID: roles,
  ): Promise<string> {
    const role = await Role.findOne(roleID);
    if (!role) {
      throw new MessageError(__('The item %s was removed', roleID));
    }

    await role.remove();

    return __('The item %s was removed');
  }
}
