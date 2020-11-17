import {
  MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique,
} from 'typeorm';

import columns from './BaseTableColumns/columns';
import roles from '../../logic/role/role.enum';
import UserRole from '../entities/UserRole';

export default class UserRole1601324675000 implements MigrationInterface {
    private readonly tableName = 'user_role';

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        name: 'user_role_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_role_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createUniqueConstraint(this.tableName, new TableUnique({
        name: 'user_role_role_id_user_id',
        columnNames: ['role_id', 'user_id'],
      }));

      const superAdmin = new UserRole();
      superAdmin.user_id = 1;
      superAdmin.role_id = roles.superAdmin;
      await superAdmin.save();

      const admin = new UserRole();
      admin.user_id = 1;
      admin.role_id = roles.admin;
      await admin.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
