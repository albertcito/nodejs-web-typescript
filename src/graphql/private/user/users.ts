// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, ObjectType, Arg, Int,
} from 'type-graphql';

import { Validate } from '../../../util/validatorjs';
import isAuth from '../../../util/graphql/isAuth';
import paginate from '../../../util/db/paginate';
import User from '../../../db/entities/User';
import PaginationResponse from '../../type/PaginationResponse';

@ObjectType()
class UserPaginationResponse extends PaginationResponse(User) {}

@Resolver()
class UserResolver {
  @Query(() => UserPaginationResponse)
  @UseMiddleware(isAuth)
  @Validate({
    page: 'required|integer|min:1',
    limit: 'required|integer|min:1',
  })
  async users(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
  ): Promise<UserPaginationResponse> {
    return paginate(User.createQueryBuilder(), { page, limit });
  }
}

export default UserResolver;
