import { Resolver, Mutation, Arg } from 'type-graphql';
import BasicSignUp from '../../../logic/user/BasicSignUp';
import User from '../../../db/entities/User';
import Validate from '../../../util/validatorjs/validateGraphQL';

@Resolver()
class SignUpResolver {
  @Mutation(() => User)
  @Validate({ password: 'confirmed' })
  async signUp(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    // eslint-disable-next-line no-unused-vars
    @Arg('password_confirmation') _: string,
  ): Promise<User> {
    const basicSignUp = new BasicSignUp(
      email,
      firstName,
      lastName,
      password,
    );
    return basicSignUp.save();
  }
}

export default SignUpResolver;
