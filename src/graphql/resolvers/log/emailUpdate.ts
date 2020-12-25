// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, ObjectType, Arg, Int,
} from 'type-graphql';

import PaginationResponse from '../../type/PaginationResponse';
import isAuth from '../../../util/graphql/isAuth';
import EmailUpdate from '../../../db/entities/EmailUpdate';
import Paginate from '../../../util/db/paginate';

@ObjectType()
class EmailUpdatePaginationResponse extends PaginationResponse(EmailUpdate) {}

@Resolver()
export default class EmailUpdateResolver {
  @Query(() => EmailUpdatePaginationResponse)
  @UseMiddleware(isAuth)
  async emailUpdates(
    @Arg('userID', () => Int) userID: number,
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('orderBy', () => String, { defaultValue: 'id', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
  ): Promise<EmailUpdatePaginationResponse> {
    const query = EmailUpdate.createQueryBuilder().where(
      'user_id = :userID',
      { userID },
    ).orderBy(orderBy, order);
    return (new Paginate(query)).get(page, limit);
  }
}
