import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';

export default class EmailRecipient1601940113372 implements MigrationInterface {
    private readonly tableName = 'email_recipient';

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
            name: 'email_id',
            type: 'integer',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'email_recipient_email',
        columnNames: ['email_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'email',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.query(
        'CREATE TYPE email_recipient_type AS ENUM(\'to\', \'cc\', \'bcc\')',
      );
      await queryRunner.query(
        'ALTER TABLE email_recipient ADD COLUMN "type" email_recipient_type',
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
