import { ObjectType, Field } from 'type-graphql';
import User from '../../db/entities/User';
import FieldError from '../errors/FieldError';

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export default UserResponse;
