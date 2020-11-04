import { __ } from 'i18n';
import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Role from '../../../db/entities/Role';
import MessageError from '../../../util/exceptions/MessageError';
import Validate from '../../../util/validatorjs/validateGraphQL';
import roles from '../../../logic/role/role.enum';

@Resolver()
export default class RoleResolver {
  @Query(() => Role)
  @Validate({ roleID: 'required|string' })
  async role(
    @Arg('roleID', () => roles) roleID: roles,
  ): Promise<Role> {
    const role = await Role.findOne(roleID);
    if (!role) {
      throw new MessageError(__('The item %s does not exists', `${roleID}`));
    }
    return role;
  }
}
