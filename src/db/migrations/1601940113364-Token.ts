import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import columns from './BaseTableColumns/columns';

class Token1601940113364 implements MigrationInterface {
    private readonly tableName = 'token';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'token_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'used_at',
            type: 'timestamp',
          },
          {
            name: 'expired_at',
            type: 'timestamp',
          },
          ...columns,
        ],
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}

export default Token1601940113364;
