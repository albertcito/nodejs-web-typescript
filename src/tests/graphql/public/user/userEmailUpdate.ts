import GenericTestData from '../../../config/GenericTestData';

export default class UserEmailUpdate implements GenericTestData {
  resolver() {
    return {
      query: `mutation userUpdateEmail($userID: Int!, $email: String!) {
        userUpdateEmail(userID: $userID, email: $email) {
          userID
          firstName
          lastName
          email
        }
      }`,
      variables: {
        userID: 1,
        email: 'me@albertcito.com',
      },
    };
  }

  rules() {
    return {
      userUpdateEmail: 'required',
      'userUpdateEmail.userID': 'required|integer',
      'userUpdateEmail.firstName': 'required|string',
      'userUpdateEmail.lastName': 'required|string',
      'userUpdateEmail.email': 'required|email',
    };
  }
}
