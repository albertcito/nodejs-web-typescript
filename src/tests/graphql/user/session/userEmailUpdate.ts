import GenericTestData from 'src/tests/config/GenericTestData';

export default class UserEmailUpdate implements GenericTestData {
  resolver() {
    return {
      query: `mutation userUpdateEmail($id: Int!, $email: String!) {
        userUpdateEmail(id: $id, email: $email) {
          data {
            id
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
        id: 1,
        email: 'me@albertcito.com',
      },
    };
  }

  rules() {
    return {
      userUpdateEmail: 'required',
      'userUpdateEmail.data.id': 'required|integer',
      'userUpdateEmail.data.firstName': 'required|string',
      'userUpdateEmail.data.lastName': 'required|string',
      'userUpdateEmail.data.email': 'required|email',
      'userUpdateEmail.message.type': 'required|string',
      'userUpdateEmail.message.message': 'required|string',
    };
  }
}
