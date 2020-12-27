import { __ } from 'i18n';
import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Role from 'src/db/entities/Role';
import MessageError from 'src/util/exceptions/MessageError';
import Validate from 'src/util/validatorjs/validateGraphQL';
import roles from 'src/logic/role/role.enum';

@Resolver()
export default class RoleResolver {
  @Query(() => Role)
  @Validate({ id: 'required|string' })
  async role(
    @Arg('id', () => roles) id: roles,
  ): Promise<Role> {
    const role = await Role.findOne(id);
    if (!role) {
      throw new MessageError(__('The item %s does not exists', `${id}`));
    }
    return role;
  }
}
