import { SelectQueryBuilder } from 'typeorm';

import { PaginateArgs, OrderByArgs } from '~src/util/db/interfaces';
import User from '~src/db/entities/User';
import Paginate from '~src/util/db/paginate';

interface UsersGetAll extends PaginateArgs, OrderByArgs {
  search: string;
}

export default class UsersPagination {
  private readonly query: SelectQueryBuilder<User>;

  public constructor() {
    this.query = User.createQueryBuilder();
  }

  public getAll(parameters: UsersGetAll) {
    const {
      page,
      limit,
      orderBy,
      order,
      search,
    } = parameters;

    if (search) {
      if (/^[-]?\d+$/.test(search)) {
        this.query.where(
          'user_id like :search',
          { search: `%${search}%` },
        );
      } else {
        this.query.where(
          `first_name like :search
          OR last_name like :search
          OR email like :search`,
          { search: `%${search}%` },
        );
      }
    }
    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }
}
