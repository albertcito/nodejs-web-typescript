// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, ObjectType,
} from 'type-graphql';

import User from '../../../db/entities/User';
import isAuth from '../../../util/graphql/isAuth';
import paginate from '../../../util/db/paginate';
import PaginationResponse from '../../type/PaginationResponse';

@ObjectType()
class UserPaginationResponse extends PaginationResponse(User) {}

@Resolver()
class UserResolver {
  @Query(() => UserPaginationResponse)
  @UseMiddleware(isAuth)
  async users(): Promise<UserPaginationResponse> {
    return paginate(User.createQueryBuilder(), { limit: 10, page: 1 });
  }
}

export default UserResolver;
