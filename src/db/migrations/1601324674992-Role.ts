import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import columns from './BaseTableColumns/columns';
import Role from '../entities/Role';
import roles from '../../logic/role/role.enum';

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
            name: 'description',
            type: 'varchar',
          },
          ...columns,
        ],
      }), true);

      const roleSA = new Role();
      roleSA.roleID = roles.superAdmin;
      roleSA.description = 'Right to modify anything in the system';

      const roleA = new Role();
      roleSA.roleID = roles.admin;
      roleSA.description = 'Right to modify ... to be defined';

      await queryRunner.manager.save(roleSA);
      await queryRunner.manager.save(roleA);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
