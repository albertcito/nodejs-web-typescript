import { getManager } from 'typeorm';
import { Resolver, Mutation, Arg } from 'type-graphql';

import BasicSignUp from 'src/logic/user/session/BasicSignUp';
import User from 'src/db/entities/User';
import Validate from 'src/util/validatorjs/validateGraphQL';
import Transaction from 'src/util/db/Transaction';

const { tablePath } = getManager().getRepository(User).metadata;

@Resolver()
class SignUpResolver {
  @Mutation(() => User)
  @Validate({
    password: 'confirmed',
    email: `required|email|unique:${tablePath},${tablePath}.email`,
  })
  signUp(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg('password_confirmation') _: string,
  ): Promise<User> {
    const signUp = new BasicSignUp(
      firstName,
      lastName,
      email,
      password,
    );
    return Transaction.run(() => signUp.save());
  }
}

export default SignUpResolver;
