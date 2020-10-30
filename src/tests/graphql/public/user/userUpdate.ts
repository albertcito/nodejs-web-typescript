import GenericTestData from '../../../config/GenericTestData';

export default class UserUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userUpdate($userID: Int!, $firstName: String!, $lastName: String!) {
        userUpdate(userID: $userID, lastName: $lastName, firstName: $firstName) {
          userID
          firstName
          lastName
          email
        }
      }`,
      variables: {
        userID: 1,
        firstName: 'Albert',
        lastName: 'Tjornehoj',
      },
    };
  }

  rules() {
    return {
      userUpdate: 'required',
      'userUpdate.userID': 'required|integer',
      'userUpdate.firstName': 'required|string',
      'userUpdate.lastName': 'required|string',
      'userUpdate.email': 'required|email',
    };
  }
}
