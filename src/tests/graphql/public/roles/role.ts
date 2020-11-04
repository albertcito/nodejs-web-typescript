import roles from '../../../../logic/role/role.enum';
import GenericTestData from '../../../config/GenericTestData';

export default class RoleTest implements GenericTestData {
  resolver() {
    return {
      query: `query role($roleID: roles!) {
        role(roleID: $roleID) {
          roleID
          description
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
      'role.description': 'required|string',
    };
  }
}
