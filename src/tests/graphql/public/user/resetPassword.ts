import GenericTestData from '../../../config/GenericTestData';
import dbUSers from '../../../../db/util/dbUser';
import ForgotPassword from '../../../../logic/user/ForgotPassword';

export default class ResetPasswordTest implements GenericTestData {
  async resolver() {
    const { admin } = dbUSers();
    const forgotPassword = new ForgotPassword(admin.email);
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
        password: admin.password,
        passwordConfirm: admin.password,
      },
    };
  }

  rules() {
    return {
      resetPassword: 'required|string',
    };
  }
}
