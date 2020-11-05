import { __ } from 'i18n';
import { Resolver, Mutation, Arg } from 'type-graphql';
import ActivateEmail from '~src/logic/user/session/ActivateEmail';

@Resolver()
class ActivateEmailResolver {
  @Mutation(() => String)
  async activateEmail(@Arg('token') token: string): Promise<string> {
    const activateEmail = new ActivateEmail(token);
    await activateEmail.activate();
    return __('Your account have been activated');
  }
}

export default ActivateEmailResolver;
