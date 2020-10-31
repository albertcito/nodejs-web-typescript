import GenericTestData from '../../../config/GenericTestData';

export default class UserBasicUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userBasicUpdate($userID: Int!, $firstName: String!, $lastName: String!) {
        userBasicUpdate(userID: $userID, lastName: $lastName, firstName: $firstName) {
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
      userBasicUpdate: 'required',
      'userBasicUpdate.userID': 'required|integer',
      'userBasicUpdate.firstName': 'required|string',
      'userBasicUpdate.lastName': 'required|string',
      'userBasicUpdate.email': 'required|email',
    };
  }
}
