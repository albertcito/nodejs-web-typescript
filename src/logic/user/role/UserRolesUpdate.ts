import { __ } from 'i18n';
import {
  getManager, In, Not,
} from 'typeorm';

import User from '~src/db/entities/User';
import UserRole from '~src/db/entities/UserRole';
import roles from '~src/logic/role/role.enum';

export default class UserRolesUpdate {
  private readonly user: User

  public constructor(user: User) {
    this.user = user;
  }

  async save(rolesID: roles[]) {
    await getManager()
      .createQueryBuilder(UserRole, 'user_role')
      .where({
        role_id: Not(In(rolesID)),
        user_id: this.user.userID,
      })
      .delete()
      .execute();

    rolesID.forEach(async (roleID) => {
      /* const userRole = new UserRole();
      userRole.role_id = roleID;
      userRole.userRoleID = this.user.userID;
      await userRole.save(); */
      await UserRole.insert({ role_id: roleID, user_id: this.user.userID });
    });
    return __('The item %s was updated');
  }
}
