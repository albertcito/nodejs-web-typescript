import GenericTestData from '../../../config/GenericTestData';
import dbUSers from '../../../../db/util/dbUser';

export default class LoginTest implements GenericTestData {
  resolver() {
    const { admin } = dbUSers();
    return {
      query: `query login($email: String!, $password:String!) {
        login(email:$email, password:$password) {
          user {
            userID
            firstName
            lastName
            email
          }
          token
        }
      }`,
      variables: {
        email: admin.email,
        password: admin.password,
      },
    };
  }

  rules() {
    return {
      login: 'required',
      'login.token': 'required|string',
      'login.user.userID': 'required|integer',
      'login.user.firstName': 'required|string',
      'login.user.lastName': 'required|string',
      'login.user.email': 'required|email',
    };
  }
}
