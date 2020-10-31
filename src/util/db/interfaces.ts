export interface PaginateArgs {
  limit: number;
  page: number;
}

export interface OrderByArgs {
  orderBy: string;
  order: 'ASC' | 'DESC';
}
