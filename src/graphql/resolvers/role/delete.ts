import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg,
} from 'type-graphql';

import Role from '../../../db/entities/Role';
import MessageError from '../../../util/exceptions/MessageError';
import roles from '../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../util/graphql/isAuthRolesGraphQL';

@Resolver()
export default class RoleDeleteResolver {
  @Mutation(() => String)
  @isAuthRolesGraphQL([roles.superAdmin])
  async roleDelete(
    @Arg('id', () => roles) id: roles,
  ): Promise<string> {
    const role = await Role.findOne(id);
    if (!role) {
      throw new MessageError(__('The item %s was removed', id));
    }

    await role.remove();

    return __('The item %s was removed');
  }
}
