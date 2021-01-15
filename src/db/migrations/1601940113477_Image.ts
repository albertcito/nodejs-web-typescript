import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';

export default class Image1601940113477 implements MigrationInterface {
    private readonly tableName = 'media.image';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.query('CREATE SCHEMA IF NOT EXISTS media;');
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
            name: 'title_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'ext',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'mime',
            type: 'varchar',
            length: '25',
          },
          {
            name: 'size',
            type: 'integer',
          },
          {
            name: 'width',
            type: 'integer',
          },
          {
            name: 'height',
            type: 'integer',
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'image_title_translation',
        columnNames: ['title_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lang.translation',
        onDelete: 'RESTRICT',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
