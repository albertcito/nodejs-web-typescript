// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, ObjectType, Arg, Int,
} from 'type-graphql';

import isAuth from '../../../util/graphql/isAuth';
import Paginate from '../../../util/db/paginate';
import User from '../../../db/entities/User';
import PaginationResponse from '../../type/PaginationResponse';

@ObjectType()
class UserPaginationResponse extends PaginationResponse(User) {}

@Resolver()
class UserResolver {
  @Query(() => UserPaginationResponse)
  @UseMiddleware(isAuth)
  async users(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
  ): Promise<UserPaginationResponse> {
    return (new Paginate(User.createQueryBuilder())).get(page, limit);
  }
}

export default UserResolver;
