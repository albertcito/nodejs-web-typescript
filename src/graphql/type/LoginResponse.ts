import { Field, ObjectType } from 'type-graphql';

import User from '~src/db/entities/User';

@ObjectType()
class LoginResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}

export default LoginResponse;
