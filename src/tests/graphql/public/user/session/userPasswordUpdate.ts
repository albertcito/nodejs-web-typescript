import GenericTestData from '../../../../config/GenericTestData';
import dbUSers from '../../../../../db/util/dbUser';

export default class UserPasswordUpdate implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
    return {
      query: `mutation userUpdatePassword($userID: Int!, $password: String!) {
        userUpdatePassword(userID: $userID, password: $password) {
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
      'userUpdatePassword.data.userID': 'required|integer',
      'userUpdatePassword.data.firstName': 'required|string',
      'userUpdatePassword.data.lastName': 'required|string',
      'userUpdatePassword.data.email': 'required|email',
      'userUpdatePassword.message.type': 'required|string',
      'userUpdatePassword.message.message': 'required|string',
    };
  }
}
