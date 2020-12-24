// eslint-disable-next-line max-classes-per-file
import {
  Resolver, Query, Arg, Int, ObjectType,
} from 'type-graphql';

import PaginationResponse from '../../type/PaginationResponse';
import Translation from '../../../db/entities/Translation';
import TranslationsPagination from '../../../logic/translation/TranslationPagination';

@ObjectType()
class TranslationPaginationResponse extends PaginationResponse(Translation) {}

@Resolver()
export default class TranslationsResolver {
  @Query(() => TranslationPaginationResponse)
  translations(
    @Arg('page', () => Int, { defaultValue: 1, nullable: true }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10, nullable: true }) limit: number,
    @Arg('orderBy', () => String, { defaultValue: 'id', nullable: true }) orderBy: string,
    @Arg('order', () => String, { defaultValue: 'DESC', description: 'ASC or DESC', nullable: true }) order: 'ASC' | 'DESC',
    @Arg('search', () => String, { description: 'Search by text or ID', nullable: true }) search: string,
    @Arg('langID', () => String, { defaultValue: 'EN', nullable: true }) langID: string,
  ): Promise<TranslationPaginationResponse> {
    return (new TranslationsPagination()).getAll({
      page,
      limit,
      orderBy,
      order,
      langID,
      search,
    });
  }
}
