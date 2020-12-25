import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import roles from 'src/logic/role/role.enum';
import columns from './BaseTableColumns/columns';
import Role from '../entities/Role';
import saveTranslation from '../util/saveTranslation';

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

      await this.addDefaultValues(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }

    private async addDefaultValues(queryRunner: QueryRunner) {
      const translationSA = await saveTranslation(queryRunner, 'Super Admin', 'Super Admin', 'super-admin');
      const roleSA = new Role();
      roleSA.id = roles.superAdmin;
      roleSA.nameID = translationSA.id;
      roleSA.descriptionID = translationSA.id;
      await queryRunner.manager.save(roleSA);

      const translationA = await saveTranslation(queryRunner, 'Admin', 'Admin', 'admin');
      const roleA = new Role();
      roleA.id = roles.admin;
      roleA.nameID = translationA.id;
      roleA.descriptionID = translationA.id;
      await queryRunner.manager.save(roleA);
    }
}
