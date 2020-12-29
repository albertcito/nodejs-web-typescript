import {
  Resolver, Query, Arg,
} from 'type-graphql';

import Role from 'src/db/entities/Role';
import Validate from 'src/util/validatorjs/validateGraphQL';
import roles from 'src/logic/role/role.enum';

@Resolver()
export default class RoleResolver {
  @Query(() => Role)
  @Validate({ id: 'required|string' })
  async role(
    @Arg('id', () => roles) id: roles,
  ): Promise<Role> {
    return Role.findOneOrFail(id);
  }
}
