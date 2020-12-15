import roles from '../../../logic/role/role.enum';
import GenericTestData from '../../config/GenericTestData';

export default class RoleTest implements GenericTestData {
  resolver() {
    return {
      query: `query role($id: rolesEnum!) {
        role(id: $id) {
          id
          descriptionID
        }
      }`,
      variables: {
        id: roles.admin,
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
