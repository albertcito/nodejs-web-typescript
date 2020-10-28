import GenericTestData from '../../../config/GenericTestData';
import ForgotPassword from '../../../../logic/user/ForgotPassword';

export default class ResetPasswordTest implements GenericTestData {
  async resolver() {
    const forgotPassword = new ForgotPassword('me@albertcito.com');
    const token = await forgotPassword.getToken();
    return {
      query: `mutation resetPassword(
        $token: String!
        $password: String!
        $passwordConfirm: String!
      ) {
        resetPassword(
          token: $token
          password: $password
          password_confirmation: $passwordConfirm
        )
      }`,
      variables: {
        token: token.token,
        password: 'Hola12345',
        passwordConfirm: 'Hola12345',
      },
    };
  }

  rules() {
    return {
      resetPassword: 'required|string',
    };
  }
}
