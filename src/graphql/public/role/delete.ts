import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware,
} from 'type-graphql';

import Role from '../../../db/entities/Role';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';
import Validate from '../../../util/validatorjs/validateGraphQL';
import roles from '../../../logic/role/role.enum';

@Resolver()
export default class RoleDeleteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  @Validate({ roleID: 'required|string' })
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
