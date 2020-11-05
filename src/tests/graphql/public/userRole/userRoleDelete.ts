import GenericTestData from '../../../config/GenericTestData';
import roles from '../../../../logic/role/role.enum';
import getFakerUser from '../../../../db/factories/user.factory';
import Role from '../../../../db/entities/Role';

export default class UserRoleDeleteTest implements GenericTestData {
  async resolver() {
    const role = await Role.findOneOrFail(roles.admin);
    const user = getFakerUser();
    user.roles = [role];
    await user.save();
    return {
      query: `mutation userRoleDelete($userID: Int!, $roleID: roles!) {
        userRoleDelete(userID: $userID, roleID: $roleID)
      }`,
      variables: {
        userID: user.userID,
        roleID: roles.admin,
      },
    };
  }

  rules() {
    return {
      userRoleDelete: 'required|string',
    };
  }
}
