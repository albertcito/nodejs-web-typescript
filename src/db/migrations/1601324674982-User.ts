import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import columns from './BaseTableColumns/columns';

class User1601324674982 implements MigrationInterface {
    private readonly tableName = 'user';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          ...columns,
        ],
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}

export default User1601324674982;
