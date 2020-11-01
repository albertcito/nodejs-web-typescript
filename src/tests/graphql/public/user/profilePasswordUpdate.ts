import GenericTestData from '../../../config/GenericTestData';
import dbUSers from '../../../../db/util/dbUser';

export default class ProfilePasswordUpdate implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
    return {
      query: `mutation profileUpdatePassword($password: String!, $newPassword: String!) {
        profileUpdatePassword(newPassword: $newPassword, password: $password) {
          userID
          firstName
          lastName
          email
        }
      }
      `,
      variables: {
        password: admin.password,
        newPassword: admin.password,
      },
    };
  }

  rules() {
    return {
      profileUpdatePassword: 'required',
      'profileUpdatePassword.userID': 'required|integer',
      'profileUpdatePassword.firstName': 'required|string',
      'profileUpdatePassword.lastName': 'required|string',
      'profileUpdatePassword.email': 'required|email',
    };
  }
}
