import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, UseMiddleware, Int,
} from 'type-graphql';

import roles from '../../../logic/role/role.enum';
import UserRole from '../../../db/entities/UserRole';
import MessageError from '../../../util/exceptions/MessageError';
import isAuth from '../../../util/graphql/isAuth';

@Resolver()
export default class UserRoleDeleteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async userRoleDelete(
    @Arg('userID', () => Int) userID: number,
    @Arg('roleID', () => roles) roleID: roles,
  ): Promise<string> {
    const userRole = await UserRole.findOne({
      where: {
        user_id: userID,
        role_id: roleID,
      },
    });
    if (!userRole) {
      throw new MessageError(__('The item %s does not exists', `[${userID},${roleID}]`));
    }
    await userRole.remove();

    return __('The item %s was deleted', `[${userID},${roleID}]`);
  }
}
