import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            name: 'translation_id',
            type: 'integer',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          ...columns,
        ],
      }), true);

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
      roleSA.translationID = translationSA.translationID;
      roleSA.description = 'Right to modify anything in the system';
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
      roleA.translationID = translationA.translationID;
      roleA.description = 'Right to modify ... to be defined';
      await queryRunner.manager.save(roleA);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
