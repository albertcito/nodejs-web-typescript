import roles from '../../../../logic/role/role.enum';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class RoleTest implements GenericTestData {
  resolver() {
    return {
      query: `query role($roleID: rolesEnum!) {
        role(roleID: $roleID) {
          roleID
          descriptionID
        }
      }`,
      variables: {
        roleID: roles.admin,
      },
    };
  }

  rules() {
    return {
      role: 'required',
      'role.roleID': 'required|string',
      'role.descriptionID': 'integer',
    };
  }
}
