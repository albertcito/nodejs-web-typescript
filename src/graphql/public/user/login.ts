import { Resolver, Mutation, Arg } from 'type-graphql';

import login from '../../../logic/user/login';
import LoginResponse from '../../type/LoginResponse';

@Resolver()
class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginResponse> {
    return login(email, password);
  }
}

export default LoginResolver;
