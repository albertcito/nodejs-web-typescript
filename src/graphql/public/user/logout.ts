import { Resolver, Query, UseMiddleware } from 'type-graphql';
import isAuth from '../../../util/graphql/isAuth';
import Auth from '../../../util/session/Auth';

@Resolver()
class LogoutResolver {
  @UseMiddleware(isAuth)
  @Query(() => String, { description: 'Logout from current session' })
  async logout(): Promise<String> {
    const auth = Auth.data();
    if (auth) {
      auth.auth.revoked = true;
      await auth.auth.save();
    }
    return 'logout successfully';
  }
}

export default LogoutResolver;
