import {
  MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique,
} from 'typeorm';

import columns from './BaseTableColumns/columns';
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

      await queryRunner.manager.query(
        'INSERT INTO user_role (user_id, role_id, created_at, updated_at) VALUES (?, ?, datetime(\'now\'), datetime(\'now\'))',
        [
          1, roles.superAdmin,
        ],
      );
      await queryRunner.manager.query(
        'INSERT INTO user_role (user_id, role_id, created_at, updated_at) VALUES (?, ?, datetime(\'now\'), datetime(\'now\'))',
        [
          2, roles.admin,
        ],
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}
