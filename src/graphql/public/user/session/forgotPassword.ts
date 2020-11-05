import { __ } from 'i18n';
import { Resolver, Mutation, Arg } from 'type-graphql';
import ForgotPassword from '~src/logic/user/session/ForgotPassword';

@Resolver()
class ForgotPasswordResolver {
  @Mutation(() => String)
  async forgotPassword(@Arg('email') email: string): Promise<string> {
    const forgotPassword = new ForgotPassword(email);
    await forgotPassword.getToken();
    return __('recoveryPasswordMessage');
  }
}

export default ForgotPasswordResolver;
