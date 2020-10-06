import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
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
          name: 'user_token_id',
          type: 'int',
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
    await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
      columnNames: ['user_token_id'],
      referencedColumnNames: ['user_token_id'],
      referencedTableName: 'user_token',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}

export default UserTokenUse1601771339098;
