import { SelectQueryBuilder } from 'typeorm';
import Pagination from '../../graphql/type/Pagination';

interface PaginationProperties {
  limit: number;
  page: number;
}
async function paginate<T>(
  query: SelectQueryBuilder<T>,
  props: PaginationProperties,
): Promise<{
  pagination: Pagination,
  data: T[]
}> {
  const total = await query.getCount();

  const { page, limit } = props;
  const skippedItems = (page - 1) * limit;

  const resultPagination = query.offset(skippedItems).limit(limit);

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
