import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import columns from './BaseTableColumns/columns';

class UserTokenUse1601771339098 implements MigrationInterface {
  private readonly tableName = 'user_token_use';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'user_token_use_id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'ip',
          type: 'varchar',
        },
        {
          name: 'used_at',
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

export default UserTokenUse1601771339098;
