import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';

class OauthAccessToken1601770752669 implements MigrationInterface {
  private readonly tableName = 'oauth_access_tokens';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'oauth_access_token_id',
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
          name: 'signature',
          type: 'varchar',
        },
        {
          name: 'token',
          type: 'varchar',
        },
        {
          name: 'revoked',
          type: 'boolean',
          default: false,
        },
        {
          name: 'expired_at',
          type: 'datetime',
        },
        ...columns,
      ],
    }), true);

    await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
      name: 'oauth_access_tokens_user_id',
      columnNames: ['user_id'],
      referencedColumnNames: ['user_id'],
      referencedTableName: 'user',
      onDelete: 'RESTRICT',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}

export default OauthAccessToken1601770752669;
