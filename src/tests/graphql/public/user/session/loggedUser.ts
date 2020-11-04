import GenericTestData from '../../../../config/GenericTestData';

export default class LoggedUserTest implements GenericTestData {
  async resolver() {
    const query = `mutation {
      loggedUser {
        userID
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
      'loggedUser.userID': 'required|integer',
      'loggedUser.firstName': 'required|string',
      'loggedUser.lastName': 'required|string',
      'loggedUser.email': 'required|email',
    };
  }
}
