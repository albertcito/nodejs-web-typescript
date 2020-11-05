import { __ } from 'i18n';
import { Resolver, Mutation, Arg } from 'type-graphql';

import Validate from '~src/util/validatorjs/validateGraphQL';
import ResetPassword from '~src/logic/user/session/ResetPassword';

@Resolver()
class ResetPasswordResolver {
  @Mutation(() => String)
  @Validate({
    token: 'required|min:4',
    password: 'required|min:4|confirmed|strict_password',
  })
  async resetPassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg('password_confirmation') _: string,
  ): Promise<string> {
    const resetPassword = new ResetPassword(token, password);
    await resetPassword.save();
    return __('Your password was suscefully updated');
  }
}

export default ResetPasswordResolver;
