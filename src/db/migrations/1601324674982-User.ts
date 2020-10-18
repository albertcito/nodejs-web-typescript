import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import columns from './BaseTableColumns/columns';
import User from '../entities/User';

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

      const user = new User();
      user.firstName = 'Albert';
      user.lastName = 'Tjornehoj';
      user.email = 'me@albertcito.com';
      user.password = '123456';
      await queryRunner.manager.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }
}

export default User1601324674982;
