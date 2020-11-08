import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import columns from './BaseTableColumns/columns';

export default class Text1601738943827 implements MigrationInterface {
    private readonly tableName = 'text';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'text_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'text_lang',
        columnNames: ['lang_id'],
        referencedColumnNames: ['lang_id'],
        referencedTableName: 'lang',
        onDelete: 'RESTRICT',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
