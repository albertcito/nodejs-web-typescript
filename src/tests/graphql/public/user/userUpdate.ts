import GenericTestData from '../../../config/GenericTestData';

export default class UserUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userUpdate($userID: Int!, $lastName: String!, $firstName: String!) {
        userUpdate(userID: $userID, lastName:$lastName, firstName:$firstName) {
          userID
          firstName
          lastName
        }
      }`,
      variables: {
        userID: 1,
        firstName: 'Test user Update',
        lastName: 'Test user Update',
      },
    };
  }

  rules() {
    return {
      user: 'required',
      'user.userID': 'required|integer',
      'user.firstName': 'required|string',
      'user.lastName': 'required|string',
      'user.email': 'required|email',
    };
  }
}
