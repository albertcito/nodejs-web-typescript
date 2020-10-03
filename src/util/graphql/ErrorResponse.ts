import { ObjectType, Field } from 'type-graphql';
import FieldError from '../../resolvers/errors/FieldError';

@ObjectType()
class ErrorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

export default ErrorResponse;
