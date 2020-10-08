import { Resolver, Mutation, Arg } from 'type-graphql';

import User from '../../../db/entities/User';
import { SignUpInput, rules } from '../../input/SignUpInput';
import { getFieldErrors } from '../../../util/validatorjs';
import ValidatorError from '../../../util/exceptions/ValidatorError';

@Resolver()
class SignUpResolver {
  @Mutation(() => User)
  async signUp(@Arg('options') options: SignUpInput): Promise<User> {
    const errors = await getFieldErrors(options, rules);
    if (errors) {
      throw new ValidatorError(errors);
    }

    const user = new User();
    user.email = options.email;
    user.firstName = options.firstName;
    user.lastName = options.lastName;
    user.password = options.password;
    await user.save();

    return user;
  }
}

export default SignUpResolver;
