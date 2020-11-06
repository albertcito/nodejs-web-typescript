import { ObjectType, Field } from 'type-graphql';

import FieldError from '../../graphql/type/FieldError';

@ObjectType()
class ErrorsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

export default ErrorsResponse;
