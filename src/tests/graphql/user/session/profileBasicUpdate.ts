import GenericTestData from 'src/tests/config/GenericTestData';
import dbUsers from 'src/db/util/dbUser';

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
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
      },
    };
  }

  rules() {
    return {
      profileBasicUpdate: 'required',
      'profileBasicUpdate.data.id': 'required|integer',
      'profileBasicUpdate.data.firstName': 'required|string',
      'profileBasicUpdate.data.lastName': 'required|string',
      'profileBasicUpdate.data.email': 'required|email',
      'profileBasicUpdate.message.type': 'required|string',
      'profileBasicUpdate.message.message': 'required|string',
    };
  }
}
