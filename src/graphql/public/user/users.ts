// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, ObjectType, Arg, Int,
} from 'type-graphql';

import isAuth from '../../../util/graphql/isAuth';
import User from '../../../db/entities/User';
import PaginationResponse from '../../type/PaginationResponse';
import UsersPagination from '../../../logic/user/UsersPagination';

@ObjectType()
class UserPaginationResponse extends PaginationResponse(User) {}

@Resolver()
class UsersResolver {
  @Query(() => UserPaginationResponse)
  @UseMiddleware(isAuth)
  async users(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('name', () => String, { description: 'Search by name', nullable: true }) name: string,
    @Arg('orderBy', () => String, { defaultValue: 'user_id', description: 'Column order by', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
  ): Promise<UserPaginationResponse> {
    return (new UsersPagination()).getAll({
      page,
      limit,
      name,
      orderBy,
      order,
    });
  }
}

export default UsersResolver;
