import GenericTestData from '../../../config/GenericTestData';

export default class UserPasswordUpdate implements GenericTestData {
  resolver() {
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
        userID: 1,
        password: 'Hola12345',
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
