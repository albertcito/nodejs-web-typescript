// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, UseMiddleware, Arg, Int, ObjectType,
} from 'type-graphql';

import Lang from '../../../db/entities/Lang';
import isAuth from '../../../util/graphql/isAuth';
import Paginate from '../../../util/db/paginate';
import PaginationResponse from '../../type/PaginationResponse';

@ObjectType()
class LangPaginationResponse extends PaginationResponse(Lang) {}

@Resolver()
class LangResolver {
  @Query(() => LangPaginationResponse)
  @UseMiddleware(isAuth)
  langs(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
  ): Promise<LangPaginationResponse> {
    return (new Paginate(Lang.createQueryBuilder())).get(page, limit);
  }
}

export default LangResolver;
