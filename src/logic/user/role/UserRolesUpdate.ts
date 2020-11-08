import { __ } from 'i18n';
import {
  getManager, In, Not,
} from 'typeorm';

import User from '~src/db/entities/User';
import UserRole from '~src/db/entities/UserRole';
import roles from '~src/logic/role/role.enum';
import MessageType from '~src/graphql/type/MessageType.enum';
import MessageField from '~src/graphql/type/MessageField';

export default class UserRolesUpdate {
  private readonly user: User

  public constructor(user: User) {
    this.user = user;
  }

  async save(rolesID: roles[]): Promise<MessageField> {
    await getManager()
      .createQueryBuilder(UserRole, 'user_role')
      .where({
        role_id: Not(In(rolesID)),
        user_id: this.user.userID,
      })
      .delete()
      .execute();

    rolesID.forEach(async (roleID) => {
      const userRole = UserRole.findOne({
        where: { role_id: rolesID, user_id: this.user.userID },
      });
      if (!userRole) {
        await UserRole.insert({ role_id: roleID, user_id: this.user.userID });
      }
    });
    return {
      message: __('The item %s was updated', ''),
      type: MessageType.success,
    };
  }
}