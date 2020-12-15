import GenericTestData from '../../config/GenericTestData';

export default class UserTest implements GenericTestData {
  resolver() {
    return {
      query: `query user($id: Int!) {
        user(id: $id) {
          id
          email
          firstName
          lastName
        }
      }`,
      variables: {
        id: 1,
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
