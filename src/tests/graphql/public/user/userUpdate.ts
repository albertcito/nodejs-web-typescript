import GenericTestData from '../../../config/GenericTestData';

export default class UserUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userUpdate($userID: Int!, $firstName: String!, $lastName: String!) {
        userUpdate(userID: $userID, lastName: $lastName, firstName: $firstName) {
          data {
            userID
            firstName
            lastName
            email
          }
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
      'userUpdate.data.userID': 'required|integer',
      'userUpdate.data.firstName': 'required|string',
      'userUpdate.data.lastName': 'required|string',
      'userUpdate.data.email': 'required|email',
    };
  }
}
