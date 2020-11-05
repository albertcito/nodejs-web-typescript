import { Resolver, Mutation, Arg } from 'type-graphql';

import Login from '~src/logic/user/session/login';
import LoginResponse from '../../../type/LoginResponse';

@Resolver()
class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginResponse> {
    return (new Login(email, password)).getUser();
  }
}

export default LoginResolver;
