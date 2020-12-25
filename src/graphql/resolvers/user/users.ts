// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, ObjectType, Arg, Int,
} from 'type-graphql';

import PaginationResponse from 'src/graphql/type/PaginationResponse';
import isAuth from 'src/util/graphql/isAuth';
import User from 'src/db/entities/User';
import UsersPagination from 'src/logic/user/UsersPagination';

@ObjectType()
class UserPaginationResponse extends PaginationResponse(User) {}

@Resolver()
class UsersResolver {
  @Query(() => UserPaginationResponse)
  @UseMiddleware(isAuth)
  async users(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('search', () => String, { description: 'Search by name, email or ID', nullable: true }) search: string,
    @Arg('orderBy', () => String, { defaultValue: 'id', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
  ): Promise<UserPaginationResponse> {
    return (new UsersPagination()).getAll({
      page,
      limit,
      search,
      orderBy,
      order,
    });
  }
}

export default UsersResolver;
