import { ClassType, ObjectType, Field } from 'type-graphql';

import Pagination from './Pagination';

export default function PaginationResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    data: TItem[];

    @Field(() => Pagination)
    pagination: Pagination;
  }
  return PaginatedResponseClass;
}
