import { SelectQueryBuilder } from 'typeorm';
import { PaginateArgs, OrderByArgs } from '../../util/db/interfaces';
import User from '../../db/entities/User';
import Paginate from '../../util/db/paginate';

interface UsersGetAll extends PaginateArgs, OrderByArgs {
  name: string;
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
      name,
    } = parameters;

    if (name) {
      this.query.where(
        'first_name like :firstName OR last_name like :lastName',
        { firstName: '%dean%', lastName: `%${name}%` },
      );
    }
    if (orderBy && order) {
      this.query.orderBy(orderBy, order);
    }
    return (new Paginate(this.query)).get(page, limit);
  }
}
