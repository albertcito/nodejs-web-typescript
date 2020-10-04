import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import columns from './BaseTableColumns/columns';

class UserToken1601770752669 implements MigrationInterface {
  private readonly tableName = 'user_token';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'user_token_id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_id',
          type: 'int',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'revoked',
          type: 'boolean',
          default: false,
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

export default UserToken1601770752669;
