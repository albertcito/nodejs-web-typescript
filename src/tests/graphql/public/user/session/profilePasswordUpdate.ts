import GenericTestData from '../../../../config/GenericTestData';
import dbUSers from '../../../../../db/util/dbUser';

export default class ProfilePasswordUpdate implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
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
        password: admin.password,
        newPassword: admin.password,
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
