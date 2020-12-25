import * as faker from 'faker';

import GenericTestData from 'src/tests/config/GenericTestData';

export default class SignUpTest implements GenericTestData {
  resolver() {
    const email = `signup@${faker.random.uuid()}.com`;
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    return {
      query: `mutation signUp(
        $email: String!,
        $password: String!,
        $password_confirmation: String!,
        $firstName: String!,
        $lastName: String!,
      ) {
        signUp(
          email: $email,
          password: $password,
          password_confirmation: $password_confirmation,
          firstName: $firstName,
          lastName: $lastName,
        ) {
          id
          firstName
          lastName
          email
        }
      }`,
      variables: {
        email,
        password: '123456At',
        password_confirmation: '123456At',
        firstName,
        lastName,
      },
    };
  }

  rules() {
    return {
      'signUp.id': 'required|integer',
      'signUp.firstName': 'required|string',
      'signUp.lastName': 'required|string',
      'signUp.email': 'required|email',
    };
  }
}
