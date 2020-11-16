import roles from '../../../../logic/role/role.enum';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class RoleTest implements GenericTestData {
  resolver() {
    return {
      query: `query role($roleID: rolesEnum!) {
        role(roleID: $roleID) {
          id
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
      'role.id': 'required|string',
      'role.descriptionID': 'integer',
    };
  }
}
