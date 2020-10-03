import { ObjectType, Field } from 'type-graphql';
import ErrorResponse from '../../util/graphql/ErrorResponse';
import User from '../../db/entities/User';

@ObjectType()
class UserResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

export default UserResponse;
