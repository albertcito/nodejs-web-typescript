// eslint-disable-next-line max-classes-per-file
import { SelectQueryBuilder } from 'typeorm';
import { arg, validate } from '../validatorjs/validateFunction';

class Paginate<T> {
  private readonly query: SelectQueryBuilder<T>;

  constructor(query: SelectQueryBuilder<T>) {
    this.query = query;
  }

  @validate({
    page: 'required|integer|min:1',
    limit: 'required|integer|min:1',
  })
  async get(@arg('limit') limit: number, @arg('page') page: number) {
    const total = await this.query.getCount();

    const skippedItems = (page - 1) * limit;

    const resultPagination = this.query.offset(skippedItems).limit(limit);

    const data = await resultPagination.getMany();
    const to = (page) * limit;
    const from = (page - 1) * limit;

    const pagination = {
      length: data.length,
      total,
      page,
      limit,
      from: (from < total) ? from : total,
      to: (to < total) ? to : total,
    };

    return {
      pagination,
      data,
    };
  }
}

export default Paginate;
