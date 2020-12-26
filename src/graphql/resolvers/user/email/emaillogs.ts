// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, Arg, Int, ObjectType,
} from 'type-graphql';

import roles from '../../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../../util/graphql/isAuthRolesGraphQL';
import EmailLogPagination from '../../../../logic/user/emaillog/EmailLogPagination';
import Email from '../../../../db/entities/EmailLog';
import PaginationResponse from '../../../type/PaginationResponse';

@ObjectType()
class EmailLogPaginationResponse extends PaginationResponse(Email) {}

@Resolver()
export default class UserStatusUpdateResolver {
  @Query(() => EmailLogPaginationResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
  async emaillogs(
    @Arg('userID', () => Int) userID: number,
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('orderBy', () => String, { defaultValue: 'id', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
  ): Promise<EmailLogPaginationResponse> {
    return (new EmailLogPagination()).getAll({
      userID,
      page,
      limit,
      orderBy,
      order,
    });
  }
}
