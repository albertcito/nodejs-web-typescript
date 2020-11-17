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
        user_id: this.user.id,
      })
      .delete()
      .execute();
    await this.saveRoles(rolesID);
    return {
      message: __('The item %s was updated', ''),
      type: MessageType.success,
    };
  }

  private async saveRoles(rolesID: roles[]) {
    const promises = [];
    for (let i = 0; i < rolesID.length; i += 1) {
      const roleID = rolesID[i];
      promises.push(this.saveRole(roleID));
    }
    await Promise.all(promises);
  }

  private async saveRole(roleID: roles) {
    const userRole = await UserRole.findOne({
      where: { role_id: roleID, user_id: this.user.id },
    });
    if (!userRole) {
      UserRole.insert({ role_id: roleID, user_id: this.user.id });
    }
  }
}
