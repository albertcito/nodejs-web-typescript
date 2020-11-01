import GenericTestData from '../../../config/GenericTestData';

export default class UserEmailUpdate implements GenericTestData {
  resolver() {
    return {
      query: `mutation userUpdateEmail($userID: Int!, $email: String!) {
        userUpdateEmail(userID: $userID, email: $email) {
          data {
            userID
            firstName
            lastName
            email
          }
          message {
            type
            message
          }
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
      'userUpdateEmail.data.userID': 'required|integer',
      'userUpdateEmail.data.firstName': 'required|string',
      'userUpdateEmail.data.lastName': 'required|string',
      'userUpdateEmail.data.email': 'required|email',
      'userUpdateEmail.message.type': 'required|string',
      'userUpdateEmail.message.message': 'required|string',
    };
  }
}
