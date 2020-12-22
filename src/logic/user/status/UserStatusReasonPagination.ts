import { SelectQueryBuilder } from 'typeorm';

import { PaginateArgs, OrderByArgs } from '../../../util/db/interfaces';
import UserStatuReason from '../../../db/entities/UserStatusReason';
import Paginate from '../../../util/db/paginate';

interface UserStatusReasonPaginationGetAll extends PaginateArgs, OrderByArgs {
  userID: number;
}

export default class UserStatusReasonPagination {
  private readonly query: SelectQueryBuilder<UserStatuReason>;

  public constructor() {
    this.query = UserStatuReason.createQueryBuilder();
  }

  public getAll(parameters: UserStatusReasonPaginationGetAll) {
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
