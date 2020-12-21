import { SelectQueryBuilder } from 'typeorm';

import Paginate from '../../../util/db/paginate';
import { PaginateArgs, OrderByArgs } from '../../../util/db/interfaces';
import UserStatusReason from '../../../db/entities/UserStatusReason';

interface UserStatusGetAll extends PaginateArgs, OrderByArgs {
  userID: number;
}

export default class UserStatusReasonPagination {
  private readonly query: SelectQueryBuilder<UserStatusReason>;

  public constructor() {
    this.query = UserStatusReason.createQueryBuilder();
  }

  public getAll(parameters: UserStatusGetAll) {
    const {
      page,
      limit,
      orderBy,
      order,
      userID,
    } = parameters;
    this.query.where({ userID });
    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }
}
