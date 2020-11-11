import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import columns from './BaseTableColumns/columns';
import Role from '../entities/Role';

import roles from '~src/logic/role/role.enum';
import TranslationCreate from '~src/logic/lang/TranslationCreate';

export default class Role1601324674992 implements MigrationInterface {
    private readonly tableName = 'role';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'role_id',
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
        referencedColumnNames: ['translation_id'],
        referencedTableName: 'translation',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'role_description_translation',
        columnNames: ['description_id'],
        referencedColumnNames: ['translation_id'],
        referencedTableName: 'translation',
        onDelete: 'RESTRICT',
      }));

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
      roleSA.roleID = roles.superAdmin;
      roleSA.nameID = translationSA.translationID;
      await queryRunner.manager.save(roleSA);

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
      roleA.roleID = roles.admin;
      roleA.nameID = translationA.translationID;
      await queryRunner.manager.save(roleA);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
