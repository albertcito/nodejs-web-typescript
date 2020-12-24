import { SelectQueryBuilder } from 'typeorm';

import { PaginateArgs, OrderByArgs } from '../../util/db/interfaces';
import Translation from '../../db/entities/Translation';
import Paginate from '../../util/db/paginate';
import isNumber from '../../util/functions/isNumber';

interface TranslationsGetAll extends PaginateArgs, OrderByArgs {
  search?: string;
  langID?: string;
}

export default class TranslationsPagination {
  private readonly query: SelectQueryBuilder<Translation>;

  public constructor() {
    this.query = Translation.createQueryBuilder('translation');
  }

  public getAll(parameters: TranslationsGetAll) {
    const {
      page,
      limit,
      orderBy,
      order,
      search,
      langID,
    } = parameters;

    if (langID || search) {
      this.query.innerJoin(
        'vtext',
        'vtext',
        'translation.id = vtext.translation_id',
      );
    }

    if (langID) {
      this.query.where('vtext.lang_id = :langID', { langID });
    }

    if (search) {
      if (isNumber(search)) {
        this.query.andWhere('translation.id = :id', { search });
      } else {
        this.query.andWhere(
          'unaccent(vtext.text) ilike unaccent(:search)',
          { search: `%${search}%` },
        );
      }
    }

    if (orderBy && order) {
      this.query.orderBy(`"translation"."${orderBy}"`, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }
}
