import roles from '../../../../logic/role/role.enum';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class RoleUpdateTest implements GenericTestData {
  async resolver() {
    return {
      query: `mutation roleUpdate($roleID: rolesEnum!, $nameID: Int! $descriptionID: Int!){
        roleUpdate(roleID: $roleID, nameID: $nameID, descriptionID: $descriptionID) {
          data {
            roleID
            nameID
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
        nameID: 1,
        descriptionID: 1,
      },
    };
  }

  rules() {
    return {
      roleUpdate: 'required',
      'roleUpdate.data.roleID': 'required|string',
      'roleUpdate.data.nameID': 'required|integer',
      'roleUpdate.data.descriptionID': 'required|integer',
      'roleUpdate.message.type': 'required|string',
      'roleUpdate.message.message': 'required|string',
    };
  }
}
