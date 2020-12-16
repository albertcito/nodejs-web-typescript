import { SelectQueryBuilder } from 'typeorm';

import { PaginateArgs, OrderByArgs } from '../../util/db/interfaces';
import Translation from '../../db/entities/Translation';
import Paginate from '../../util/db/paginate';

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

    if (search && this.isNumber(search)) {
      this.findByID(search);
    } else if (search || langID) {
      this.query.innerJoin(
        'vtext',
        'vtext',
        'translation.id = vtext.translation_id',
      );
      if (search) {
        this.findByString(search);
      }

      if (langID) {
        this.query.where('vtext.lang_id = :langID', { langID });
      }
    }

    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }

  private isNumber(search: string) {
    return /^[-]?\d+$/.test(search);
  }

  private findByID(id: string) {
    this.query.where('translation.id = :id', { id });
  }

  private findByString(search:string) {
    this.query.where('vtext.text like :search', { search: `%${search}%` });
  }
}
