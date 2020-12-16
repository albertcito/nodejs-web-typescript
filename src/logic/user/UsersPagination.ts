import { SelectQueryBuilder } from 'typeorm';

import { PaginateArgs, OrderByArgs } from '../../util/db/interfaces';
import User from '../../db/entities/User';
import Paginate from '../../util/db/paginate';

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

    if (search && /^[-]?\d+$/.test(search)) {
      this.findByID(search);
    } else if (search) {
      this.findByString(search);
    }

    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }

  private findByID(search:string) {
    this.query.where(
      'id = :search',
      { search: `${search}` },
    );
  }

  private findByString(search:string) {
    this.query.where(
      `first_name like :search
      OR last_name like :search
      OR email like :search`,
      { search: `%${search}%` },
    );
  }
}
