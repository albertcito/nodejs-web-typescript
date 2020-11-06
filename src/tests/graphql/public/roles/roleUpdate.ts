import roles from '../../../../logic/role/role.enum';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class RoleUpdateTest implements GenericTestData {
  async resolver() {
    return {
      query: `mutation roleUpdate($roleID: roles!, $description: String!){
        roleUpdate(roleID: $roleID, description: $description) {
          data {
            roleID
            description
          }
          message {
            type
            message
          }
        }
      }`,
      variables: {
        roleID: roles.superAdmin,
        description: 'roleUpdate mutation test',
      },
    };
  }

  rules() {
    return {
      roleUpdate: 'required',
      'roleUpdate.data.roleID': 'required|string',
      'roleUpdate.data.description': 'required|string',
      'roleUpdate.message.type': 'required|string',
      'roleUpdate.message.message': 'required|string',
    };
  }
}
