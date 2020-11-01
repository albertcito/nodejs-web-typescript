import { __ } from 'i18n';
import { Resolver, Mutation, Arg } from 'type-graphql';

import Validate from '../../../util/validatorjs/validateGraphQL';
import ResetPassword from '../../../logic/user/ResetPassword';

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
    // eslint-disable-next-line no-unused-vars
    @Arg('password_confirmation') _: string,
  ): Promise<string> {
    const resetPassword = new ResetPassword(token, password);
    await resetPassword.save();
    return __('Your password was suscefully updated');
  }
}

export default ResetPasswordResolver;
