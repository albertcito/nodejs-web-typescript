import GenericTestData from '~src/tests/config/GenericTestData';

export default class LoggedUserTest implements GenericTestData {
  async resolver() {
    const query = `mutation {
      loggedUser {
        id
        firstName
        lastName
        email
      }
    }`;
    return { query };
  }

  rules() {
    return {
      loggedUser: 'required',
      'loggedUser.id': 'required|integer',
      'loggedUser.firstName': 'required|string',
      'loggedUser.lastName': 'required|string',
      'loggedUser.email': 'required|email',
    };
  }
}
