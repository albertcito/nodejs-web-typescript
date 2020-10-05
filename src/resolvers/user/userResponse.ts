import { ObjectType, Field } from 'type-graphql';
import User from '../../db/entities/User';

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

export default UserResponse;
