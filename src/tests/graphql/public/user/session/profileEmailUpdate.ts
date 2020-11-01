import GenericTestData from '../../../../config/GenericTestData';
import dbUSers from '../../../../../db/util/dbUser';

export default class ProfileEmailUpdate implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
    return {
      query: `mutation profileUpdateEmail(
        $email: String!
        $password: String!
      ) {
        profileUpdateEmail(email: $email, password: $password) {
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
        email: admin.email,
      },
    };
  }

  rules() {
    return {
      profileUpdateEmail: 'required',
      'profileUpdateEmail.data.userID': 'required|integer',
      'profileUpdateEmail.data.firstName': 'required|string',
      'profileUpdateEmail.data.lastName': 'required|string',
      'profileUpdateEmail.data.email': 'required|email',
      'profileUpdateEmail.message.type': 'required|string',
      'profileUpdateEmail.message.message': 'required|string',
    };
  }
}
