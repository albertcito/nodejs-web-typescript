import dbUsers from '../../../../../db/util/dbUser';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class UserPasswordUpdate implements GenericTestData {
  resolver() {
    const { superAdmin } = dbUsers();
    return {
      query: `mutation userUpdatePassword($id: Int!, $password: String!) {
        userUpdatePassword(id: $id, password: $password) {
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
      }
      `,
      variables: {
        id: superAdmin.userID,
        password: superAdmin.password,
      },
    };
  }

  rules() {
    return {
      userUpdatePassword: 'required',
      'userUpdatePassword.data.id': 'required|integer',
      'userUpdatePassword.data.firstName': 'required|string',
      'userUpdatePassword.data.lastName': 'required|string',
      'userUpdatePassword.data.email': 'required|email',
      'userUpdatePassword.message.type': 'required|string',
      'userUpdatePassword.message.message': 'required|string',
    };
  }
}
