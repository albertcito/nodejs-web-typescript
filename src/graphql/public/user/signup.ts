import { Resolver, Mutation, Arg } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '../../../db/entities/User';
import Validate from '../../../util/validatorjs/validateGraphQL';

const { tablePath } = getManager().getRepository(User).metadata;

@Resolver()
class SignUpResolver {
  @Mutation(() => User)
  @Validate({
    firstName: 'required|string',
    lastName: 'required|string',
    email: `required|email|unique:${tablePath},email`,
    password: 'required|min:4|confirmed|strict_password',
  })
  async signUp(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    // eslint-disable-next-line no-unused-vars
    @Arg('password_confirmation') _: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    await user.save();
    return user;
  }
}

export default SignUpResolver;
