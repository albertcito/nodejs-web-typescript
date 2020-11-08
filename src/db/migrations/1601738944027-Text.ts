import {
  MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique
} from 'typeorm';

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
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'text_lang',
        columnNames: ['lang_id'],
        referencedColumnNames: ['lang_id'],
        referencedTableName: 'lang',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createUniqueConstraint(this.tableName, new TableUnique({
        name: 'test_translation_lang',
        columnNames: ['lang_id', 'translation_id'],
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
