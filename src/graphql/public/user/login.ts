import { Resolver, Query, Arg } from 'type-graphql';

import Login from '../../../logic/user/login';
import LoginResponse from '../../type/LoginResponse';

@Resolver()
class LoginResolver {
  @Query(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginResponse> {
    return (new Login(email, password)).getUser();
  }
}

export default LoginResolver;
