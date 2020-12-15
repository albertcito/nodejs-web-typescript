import GenericTestData from '../../../config/GenericTestData';
import dbUsers from '../../../../db/util/dbUser';

export default class ProfileEmailUpdate implements GenericTestData {
  resolver() {
    const { superAdmin } = dbUsers();
    return {
      query: `mutation profileUpdateEmail(
        $email: String!
        $password: String!
      ) {
        profileUpdateEmail(email: $email, password: $password) {
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
        email: superAdmin.email,
      },
    };
  }

  rules() {
    return {
      profileUpdateEmail: 'required',
      'profileUpdateEmail.data.id': 'required|integer',
      'profileUpdateEmail.data.firstName': 'required|string',
      'profileUpdateEmail.data.lastName': 'required|string',
      'profileUpdateEmail.data.email': 'required|email',
      'profileUpdateEmail.message.type': 'required|string',
      'profileUpdateEmail.message.message': 'required|string',
    };
  }
}
