import { MigrationInterface, QueryRunner, Table } from 'typeorm';
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
            name: 'user_id',
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
          ...columns,
        ],
      }), true);

      const { superAdmin } = dbUsers();
      const user = new User();
      user.firstName = superAdmin.firstName;
      user.lastName = superAdmin.lastName;
      user.email = superAdmin.email;
      user.password = superAdmin.password;
      await queryRunner.manager.save(user);

      const { admin } = dbUsers();
      const userAdmin = new User();
      user.firstName = admin.firstName;
      user.lastName = admin.lastName;
      user.email = admin.email;
      user.password = admin.password;
      await queryRunner.manager.save(userAdmin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}

export default User1601324674982;
