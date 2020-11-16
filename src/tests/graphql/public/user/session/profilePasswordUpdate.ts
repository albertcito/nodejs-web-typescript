import dbUsers from '../../../../../db/util/dbUser';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class ProfilePasswordUpdate implements GenericTestData {
  resolver() {
    const { superAdmin } = dbUsers();
    return {
      query: `mutation profileUpdatePassword($password: String!, $newPassword: String!) {
        profileUpdatePassword(newPassword: $newPassword, password: $password) {
          data {
            id
            firstName
            lastName
            email
          }
          message {
            type
            message
          }
        }
      }`,
      variables: {
        password: superAdmin.password,
        newPassword: superAdmin.password,
      },
    };
  }

  rules() {
    return {
      profileUpdatePassword: 'required',
      'profileUpdatePassword.data.id': 'required|integer',
      'profileUpdatePassword.data.firstName': 'required|string',
      'profileUpdatePassword.data.lastName': 'required|string',
      'profileUpdatePassword.data.email': 'required|email',
      'profileUpdatePassword.message.type': 'required|string',
      'profileUpdatePassword.message.message': 'required|string',
    };
  }
}
