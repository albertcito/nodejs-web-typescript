import GenericTestData from 'src/tests/config/GenericTestData';
import roles from 'src/logic/role/role.enum';

export default class UserRolesUpdateTest implements GenericTestData {
  resolver() {
    const data = {
      query: `mutation userRolesUpdate($userID: Int!, $rolesID: [String!]!) {
        userRolesUpdate(userID: $userID, rolesID: $rolesID) {
          message
          type
        }
      }`,
      variables: {
        userID: 1,
        rolesID: [roles.admin, roles.superAdmin],
      },
    };
    return data;
  }

  rules() {
    return {
      userRolesUpdate: 'required',
      'userRolesUpdate.message': 'required|string',
      'userRolesUpdate.type': 'required|string',
    };
  }
}
