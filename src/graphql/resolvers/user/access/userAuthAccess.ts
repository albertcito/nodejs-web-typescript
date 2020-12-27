// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, ObjectType, Arg, Int,
} from 'type-graphql';

import PaginationResponse from '../../../type/PaginationResponse';
import OauthAccessToken from '../../../../db/entities/OauthAccessToken';
import Paginate from '../../../../util/db/paginate';
import roles from '../../../../logic/role/role.enum';
import isAuthRolesGraphQL from '../../../../util/graphql/isAuthRolesGraphQL';

@ObjectType()
class OauthAccessTokenPaginationResponse extends PaginationResponse(OauthAccessToken) {}

@Resolver()
export default class EmailUpdateResolver {
  @Query(() => OauthAccessTokenPaginationResponse)
  @isAuthRolesGraphQL([roles.superAdmin])
  async userAuthAccess(
    @Arg('userID', () => Int) userID: number,
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('orderBy', () => String, { defaultValue: 'id', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
  ): Promise<OauthAccessTokenPaginationResponse> {
    const query = OauthAccessToken.createQueryBuilder().where(
      'user_id = :userID',
      { userID },
    ).orderBy(orderBy, order);
    return (new Paginate(query)).get(page, limit);
  }
}
