import { Resolver, Mutation, Arg } from 'type-graphql';

import LoginResponse from '../../../type/LoginResponse';
import Login from '../../../../logic/user/session/login';

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
