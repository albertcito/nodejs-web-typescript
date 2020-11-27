import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';
import Role from '../entities/Role';
import roles from '../../logic/role/role.enum';
import TranslationCreate from '../../logic/translation/TranslationCreate';

export default class Role1601324674992 implements MigrationInterface {
    private readonly tableName = 'role';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name_id',
            type: 'integer',
          },
          {
            name: 'description_id',
            type: 'integer',
            isNullable: true,
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'role_name',
        columnNames: ['name_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'translation',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'role_description_translation',
        columnNames: ['description_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'translation',
        onDelete: 'RESTRICT',
      }));

      await this.addDefaultValues();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }

    private async addDefaultValues() {
      const textSA = [
        {
          text: 'Super Admin',
          langID: 'EN',
        },
        {
          text: 'Super Admin',
          langID: 'ES',
        },
      ];
      const translationSA = await (new TranslationCreate(textSA)).save();

      const roleSA = new Role();
      roleSA.id = roles.superAdmin;
      roleSA.nameID = translationSA.id;
      await roleSA.save();

      const textA = [
        {
          text: 'Super Admin',
          langID: 'EN',
        },
        {
          text: 'Super Admin',
          langID: 'ES',
        },
      ];
      const translationA = await (new TranslationCreate(textA)).save();

      const roleA = new Role();
      roleA.id = roles.admin;
      roleA.nameID = translationA.id;
      await roleA.save();
    }
}
