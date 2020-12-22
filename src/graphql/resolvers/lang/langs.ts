// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, Arg, Int, ObjectType,
} from 'type-graphql';

import PaginationResponse from '../../type/PaginationResponse';
import Lang from 'src/db/entities/Lang';
import Paginate from 'src/util/db/paginate';

@ObjectType()
class LangPaginationResponse extends PaginationResponse(Lang) {}

@Resolver()
class LangsResolver {
  @Query(() => LangPaginationResponse)
  langs(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
  ): Promise<LangPaginationResponse> {
    return (new Paginate(Lang.createQueryBuilder())).get(page, limit);
  }
}

export default LangsResolver;
