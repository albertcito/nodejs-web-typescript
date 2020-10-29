import GenericTestData from '../../../config/GenericTestData';

export default class LoginTest implements GenericTestData {
  resolver() {
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
        email: 'me@albertcito.com',
        password: 'Hola12345',
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
