import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

const columns: TableColumnOptions[] = [
  {
    name: 'created_by',
    type: 'integer',
    isNullable: true,
  },
  {
    name: 'updated_by',
    type: 'integer',
    isNullable: true,
  },
  {
    name: 'created_at',
    type: 'datetime',
  },
  {
    name: 'updated_at',
    type: 'datetime',
  },
];

export default columns;
