import { SelectQueryBuilder } from 'typeorm';
import Pagination from '../../graphql/type/Pagination';

interface PaginationProperties {
  limit: number;
  page: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
}
async function paginate<T>(
  query: SelectQueryBuilder<T>,
  props: PaginationProperties,
): Promise<{
  pagination: Pagination,
  data: T[]
}> {
  const total = await query.getCount();

  const {
    page, limit, order, orderBy,
  } = props;
  const skippedItems = (page - 1) * limit;

  const resultPagination = query.offset(skippedItems).limit(limit);
  if (order && orderBy) {
    query.orderBy(orderBy, order);
  }

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

export default paginate;
