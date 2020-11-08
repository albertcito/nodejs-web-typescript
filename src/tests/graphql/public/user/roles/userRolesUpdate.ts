import GenericTestData from '~src/tests/config/GenericTestData';
import roles from '~src/logic/role/role.enum';

export default class UserRolesUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userRolesUpdate($userID: Int!, $rolesID: [String!]!) {
        userRolesUpdate(userID: $userID, rolesID: $rolesID)
    }`,
      variables: {
        userID: 1,
        rolesID: [roles.admin, roles.superAdmin],
      },
    };
  }

  rules() {
    return {
      userRolesUpdate: 'required|string',
    };
  }
}
