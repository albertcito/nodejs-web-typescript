// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, Arg, Int, ObjectType,
} from 'type-graphql';

import PaginationResponse from 'src/graphql/type/PaginationResponse';
import Role from 'src/db/entities/Role';
import Paginate from 'src/util/db/paginate';

@ObjectType()
class RolePaginationResponse extends PaginationResponse(Role) {}

@Resolver()
export default class RolesResolver {
  @Query(() => RolePaginationResponse)
  roles(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
  ): Promise<RolePaginationResponse> {
    return (new Paginate(Role.createQueryBuilder())).get(page, limit);
  }
}
