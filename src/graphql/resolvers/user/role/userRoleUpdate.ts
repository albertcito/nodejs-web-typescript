import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import MessageField from '../../../type/MessageField';
import User from '../../../../db/entities/User';
import MessageError from '../../../../util/exceptions/MessageError';
import UserRolesUpdate from '../../../../logic/user/role/UserRolesUpdate';
import roles from '../../../../logic/role/role.enum';

@Resolver()
export default class UserRoleUpdateResolver {
  @Mutation(() => MessageField)
  async userRolesUpdate(
    @Arg('rolesID', () => [String]) rolesID: roles[],
    @Arg('userID', () => Int) userID: number,
  ): Promise<MessageField> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${user}`));
    }
    return (new UserRolesUpdate(user)).save(rolesID);
  }
}
