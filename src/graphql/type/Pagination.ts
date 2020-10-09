import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
class Pagination {
  @Field(() => Int)
  length: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  from: number;

  @Field(() => Int)
  to: number;
}

export default Pagination;
