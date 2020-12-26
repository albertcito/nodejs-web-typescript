import { SelectQueryBuilder } from 'typeorm';

import { PaginateArgs, OrderByArgs } from '../../../util/db/interfaces';
import Email from '../../../db/entities/Email';
import Paginate from '../../../util/db/paginate';

interface EmailLogPaginationGetAll extends PaginateArgs, OrderByArgs {
  userID: number;
}

export default class EmailLogPagination {
  private readonly query: SelectQueryBuilder<Email>;

  public constructor() {
    this.query = Email.createQueryBuilder();
  }

  public getAll(parameters: EmailLogPaginationGetAll) {
    const {
      page,
      limit,
      orderBy,
      order,
      userID,
    } = parameters;

    this.query.where(
      'user_id = :userID',
      { userID },
    );
    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }
}
