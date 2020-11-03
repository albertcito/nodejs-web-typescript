import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import columns from './BaseTableColumns/columns';
import dbUsers from '../util/dbUser';
import UserRole from '../entities/UserRole';
import roles from '../../logic/role/role.enum';

export default class UserRole1601324675000 implements MigrationInterface {
    private readonly tableName = 'user_role';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'user_role_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'role_id',
            type: 'varchar',
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'user',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'role',
        onDelete: 'RESTRICT',
      }));

      const { superAdmin } = dbUsers();
      const userRole = new UserRole();
      userRole.userID = superAdmin.userID;
      userRole.roleID = roles.superAdmin;
      await queryRunner.manager.save(userRole);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
