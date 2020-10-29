import GenericTestData from '../../../config/GenericTestData';

export default class ForgotPasswordTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation forgotPassword($email: String!) {
        forgotPassword(email: $email)
      }`,
      variables: {
        email: 'me@albertcito.com',
      },
    };
  }

  rules() {
    return {
      forgotPassword: 'required|string',
    };
  }
}
