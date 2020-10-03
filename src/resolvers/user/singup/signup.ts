import {
  Resolver, Mutation, Ctx, Arg,
} from 'type-graphql';

import { ApolloServerContext } from '../../../ApolloServerContext';
import User from '../../../db/entities/User';
import { SignUpInput, rules } from './signupInput';
import { getFieldErrors } from '../../../util/validatorjs';
import UserResponse from '../userResponse';

@Resolver()
class SignUpResolver {
  @Mutation(() => UserResponse)
  async signUp(
    @Arg('options') options: SignUpInput,
    @Ctx() { db }: ApolloServerContext,
  ): Promise<UserResponse> {
    const errors = await getFieldErrors(options, rules);
    if (errors) {
      return { errors };
    }

    const user = new User();
    user.email = options.email;
    user.firstName = options.firstName;
    user.lastName = options.lastName;
    user.password = options.password;
    await db.manager.save(user);

    return { user };
  }
}

export default SignUpResolver;
