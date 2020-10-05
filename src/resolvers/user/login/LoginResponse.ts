import { Field, ObjectType } from 'type-graphql';
import UserResponse from '../userResponse';

@ObjectType()
class LoginResponse extends UserResponse {
  @Field(() => String, { nullable: true })
  token?: string;
}

export default LoginResponse;
