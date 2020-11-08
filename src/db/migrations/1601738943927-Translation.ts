import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import columns from './BaseTableColumns/columns';

export default class Translation1601738943827 implements MigrationInterface {
    private readonly tableName = 'translation';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'translation_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'is_blocked',
            type: 'boolean',
            default: false,
          },
          ...columns,
        ],
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
