import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import userStatus from 'src/logic/userStatus/userStatus.enum';
import columns from './BaseTableColumns/columns';
import User from '../entities/User';
import dbUsers from '../util/dbUser';

class User1601324674982 implements MigrationInterface {
    private readonly tableName = 'user';

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
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'user_status_id',
            type: 'varchar',
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_status',
        columnNames: ['user_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_status',
        onDelete: 'RESTRICT',
      }));

      await this.addDefaultData(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }

    async addDefaultData(queryRunner: QueryRunner) {
      const { superAdmin, admin } = dbUsers();

      const user = new User();
      user.firstName = superAdmin.firstName;
      user.lastName = superAdmin.lastName;
      user.email = superAdmin.email;
      user.password = superAdmin.password;
      user.emailVerified = true;
      user.userStatusID = userStatus.active;
      await queryRunner.manager.save(user);

      const userAdmin = new User();
      userAdmin.firstName = admin.firstName;
      userAdmin.lastName = admin.lastName;
      userAdmin.email = admin.email;
      userAdmin.password = admin.password;
      userAdmin.emailVerified = true;
      userAdmin.userStatusID = userStatus.active;
      await queryRunner.manager.save(userAdmin);
    }
}

export default User1601324674982;
