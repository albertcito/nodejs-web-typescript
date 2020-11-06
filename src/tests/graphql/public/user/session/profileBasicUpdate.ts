import dbUsers from '../../../../../db/util/dbUser';

import GenericTestData from '~src/tests/config/GenericTestData';

export default class ProfileBasicUpdate implements GenericTestData {
  resolver() {
    const { superAdmin } = dbUsers();
    return {
      query: `mutation profileBasicUpdate(
        $firstName: String!
        $lastName: String!
      ) {
        profileBasicUpdate(firstName: $firstName, lastName: $lastName) {
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
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
      },
    };
  }

  rules() {
    return {
      profileBasicUpdate: 'required',
      'profileBasicUpdate.data.userID': 'required|integer',
      'profileBasicUpdate.data.firstName': 'required|string',
      'profileBasicUpdate.data.lastName': 'required|string',
      'profileBasicUpdate.data.email': 'required|email',
      'profileBasicUpdate.message.type': 'required|string',
      'profileBasicUpdate.message.message': 'required|string',
    };
  }
}
