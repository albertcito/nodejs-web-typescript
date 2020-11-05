import GenericTestData from '~src/tests/config/GenericTestData';
import dbUsers from '../../../../../db/util/dbUser';
import ForgotPassword from '../../../../../logic/user/session/ForgotPassword';

export default class ResetPasswordTest implements GenericTestData {
  async resolver() {
    const { superAdmin } = dbUsers();
    const forgotPassword = new ForgotPassword(superAdmin.email);
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
        password: superAdmin.password,
        passwordConfirm: superAdmin.password,
      },
    };
  }

  rules() {
    return {
      resetPassword: 'required|string',
    };
  }
}
