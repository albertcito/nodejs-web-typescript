import { Resolver, Mutation, Arg } from 'type-graphql';
import ActivateEmail from '../../../logic/user/ActivateEmail';

@Resolver()
class ActivateEmailResolver {
  @Mutation(() => String)
  async activateEmail(@Arg('token') token: string): Promise<string> {
    const activateEmail = new ActivateEmail(token);
    await activateEmail.activate();
    return 'User activated';
  }
}

export default ActivateEmailResolver;
