import GenericTestData from '../../../config/GenericTestData';
import dbUSers from '../../../../db/util/dbUser';

export default class UserPasswordUpdate implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
    return {
      query: `mutation userUpdatePassword($userID: Int!, $password: String!) {
        userUpdatePassword(userID: $userID, password: $password) {
          userID
          firstName
          lastName
          email
        }
      }
      `,
      variables: {
        userID: admin.userID,
        password: admin.password,
      },
    };
  }

  rules() {
    return {
      userUpdatePassword: 'required',
      'userUpdatePassword.userID': 'required|integer',
      'userUpdatePassword.firstName': 'required|string',
      'userUpdatePassword.lastName': 'required|string',
      'userUpdatePassword.email': 'required|email',
    };
  }
}
