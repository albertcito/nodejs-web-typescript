import { __ } from 'i18n';
import { Resolver, Mutation, Arg } from 'type-graphql';

import ActivateEmail from 'src/logic/user/session/ActivateEmail';
import Transaction from 'src/util/db/Transaction';

@Resolver()
class ActivateEmailResolver {
  @Mutation(() => String)
  async activateEmail(@Arg('token') token: string): Promise<string> {
    const activateEmail = new ActivateEmail(token);
    await Transaction.run(() => activateEmail.activate());
    return __('Your account have been activated');
  }
}

export default ActivateEmailResolver;
