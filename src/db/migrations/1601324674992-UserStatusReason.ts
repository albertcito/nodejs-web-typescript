import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';

export default class UserStatusReason1601324674992 implements MigrationInterface {
    private readonly tableName = 'user_status_reason';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'user_status_id',
            type: 'varchar',
          },
          {
            name: 'reason',
            type: 'varchar',
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_status_reason_status',
        columnNames: ['user_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_status',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_status_reason_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'RESTRICT',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
