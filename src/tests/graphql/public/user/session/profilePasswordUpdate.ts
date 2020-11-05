import GenericTestData from '~src/tests/config/GenericTestData';
import dbUsers from '../../../../../db/util/dbUser';

export default class ProfilePasswordUpdate implements GenericTestData {
  resolver() {
    const { superAdmin } = dbUsers();
    return {
      query: `mutation profileUpdatePassword($password: String!, $newPassword: String!) {
        profileUpdatePassword(newPassword: $newPassword, password: $password) {
          data {
            userID
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
      'profileUpdatePassword.data.userID': 'required|integer',
      'profileUpdatePassword.data.firstName': 'required|string',
      'profileUpdatePassword.data.lastName': 'required|string',
      'profileUpdatePassword.data.email': 'required|email',
      'profileUpdatePassword.message.type': 'required|string',
      'profileUpdatePassword.message.message': 'required|string',
    };
  }
}
