import roles from '../../../../logic/role/role.enum';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class RoleUpdateTest implements GenericTestData {
  async resolver() {
    return {
      query: `mutation roleUpdate($roleID: roles!, $descriptionID: Int!){
        roleUpdate(roleID: $roleID, descriptionID: $descriptionID) {
          data {
            roleID
            descriptionID
          }
          message {
            type
            message
          }
        }
      }`,
      variables: {
        roleID: roles.superAdmin,
        descriptionID: 1,
      },
    };
  }

  rules() {
    return {
      roleUpdate: 'required',
      'roleUpdate.data.roleID': 'required|string',
      'roleUpdate.data.descriptionID': 'required|integer',
      'roleUpdate.message.type': 'required|string',
      'roleUpdate.message.message': 'required|string',
    };
  }
}
