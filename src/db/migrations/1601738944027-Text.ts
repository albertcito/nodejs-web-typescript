import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';

export default class Text1601738944027 implements MigrationInterface {
    private readonly tableName = 'text';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'lang_id',
            type: 'varchar',
          },
          {
            name: 'translation_id',
            type: 'integer',
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'text_translation',
        columnNames: ['translation_id'],
        referencedColumnNames: ['translation_id'],
        referencedTableName: 'translation',
        onDelete: 'CASCADE',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'text_lang',
        columnNames: ['lang_id'],
        referencedColumnNames: ['lang_id'],
        referencedTableName: 'lang',
        onDelete: 'CASCADE',
      }));

      await queryRunner.createPrimaryKey(this.tableName, ['lang_id', 'translation_id']);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
