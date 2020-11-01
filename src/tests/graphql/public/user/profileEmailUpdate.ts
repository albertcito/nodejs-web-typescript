import GenericTestData from '../../../config/GenericTestData';
import dbUSers from '../../../../db/util/dbUser';

export default class ProfileEmailUpdate implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
    return {
      query: `mutation profileUpdateEmail(
        $email: String!
        $password: String!
      ) {
        profileUpdateEmail(email: $email, password: $password) {
          userID
          firstName
          lastName
          email
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
      'profileUpdateEmail.userID': 'required|integer',
      'profileUpdateEmail.firstName': 'required|string',
      'profileUpdateEmail.lastName': 'required|string',
      'profileUpdateEmail.email': 'required|email',
    };
  }
}
