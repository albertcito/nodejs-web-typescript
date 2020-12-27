import { __ } from 'i18n';
import { Resolver, Mutation, UseMiddleware } from 'type-graphql';

import isAuth from 'src/util/graphql/isAuth';
import Auth from 'src/util/session/Auth';

@Resolver()
class LogoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => String, { description: 'Logout from current session' })
  async logout(): Promise<String> {
    const auth = Auth.session();
    auth.auth.revoked = true;
    await auth.auth.save();
    Auth.setSession();
    return __('Your session was suscefully closed');
  }
}

export default LogoutResolver;
