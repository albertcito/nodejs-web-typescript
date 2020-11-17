import GenericTestData from '~src/tests/config/GenericTestData';

export default class UserTest implements GenericTestData {
  resolver() {
    return {
      query: `query user($userID: Int!) {
        user(userID: $userID) {
          id
          email
          firstName
          lastName
        }
      }`,
      variables: {
        userID: 1,
      },
    };
  }

  rules() {
    return {
      user: 'required',
      'user.id': 'required|integer',
      'user.firstName': 'required|string',
      'user.lastName': 'required|string',
      'user.email': 'required|email',
    };
  }
}
