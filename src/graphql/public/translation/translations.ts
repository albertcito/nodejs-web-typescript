// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, Arg, Int, ObjectType,
} from 'type-graphql';

import PaginationResponse from '../../type/PaginationResponse';

import Translation from '~src/db/entities/Translation';
import Paginate from '~src/util/db/paginate';

@ObjectType()
class TranslationPaginationResponse extends PaginationResponse(Translation) {}

@Resolver()
export default class TranslationsResolver {
  @Query(() => TranslationPaginationResponse)
  translations(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
  ): Promise<TranslationPaginationResponse> {
    return (new Paginate(Translation.createQueryBuilder())).get(page, limit);
  }
}
