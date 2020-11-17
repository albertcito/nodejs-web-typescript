import GenericTestData from '~src/tests/config/GenericTestData';

export default class UserBasicUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userBasicUpdate($id: Int!, $firstName: String!, $lastName: String!) {
        userBasicUpdate(id: $id, lastName: $lastName, firstName: $firstName) {
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
        firstName: 'Albert',
        lastName: 'Tjornehoj',
      },
    };
  }

  rules() {
    return {
      userBasicUpdate: 'required',
      'userBasicUpdate.data.id': 'required|integer',
      'userBasicUpdate.data.firstName': 'required|string',
      'userBasicUpdate.data.lastName': 'required|string',
      'userBasicUpdate.data.email': 'required|email',
      'userBasicUpdate.message.type': 'required|string',
      'userBasicUpdate.message.message': 'required|string',
    };
  }
}
