// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, Arg, Int, ObjectType,
} from 'type-graphql';

import roles from '../../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../../util/graphql/isAuthRolesGraphQL';
import UserStatusReasonPagination from '../../../../logic/user/status/UserStatusReasonPagination';
import UserStatusReason from 'src/db//entities/UserStatusReason';
import PaginationResponse from '../../../type/PaginationResponse';

@ObjectType()
class UserStatusReasonPaginationResponse extends PaginationResponse(UserStatusReason) {}

@Resolver()
export default class UserStatusUpdateResolver {
  @Query(() => UserStatusReasonPaginationResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userStatusReasons(
    @Arg('userID', () => Int) userID: number,
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('orderBy', () => String, { defaultValue: 'id', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
  ): Promise<UserStatusReasonPaginationResponse> {
    return (new UserStatusReasonPagination()).getAll({
      userID,
      page,
      limit,
      orderBy,
      order,
    });
  }
}
