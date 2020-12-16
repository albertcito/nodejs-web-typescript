import roles from '../../../logic/role/role.enum';
import GenericTestData from '../../config/GenericTestData';

export default class RoleUpdateTest implements GenericTestData {
  async resolver() {
    return {
      query: `mutation roleUpdate($id: rolesEnum!, $nameID: Int! $descriptionID: Int!){
        roleUpdate(id: $id, nameID: $nameID, descriptionID: $descriptionID) {
          data {
            id
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
        id: roles.superAdmin,
        nameID: 1,
        descriptionID: 1,
      },
    };
  }

  rules() {
    return {
      roleUpdate: 'required',
      'roleUpdate.data.id': 'required|string',
      'roleUpdate.data.nameID': 'required|integer',
      'roleUpdate.data.descriptionID': 'required|integer',
      'roleUpdate.message.type': 'required|string',
      'roleUpdate.message.message': 'required|string',
    };
  }
}
