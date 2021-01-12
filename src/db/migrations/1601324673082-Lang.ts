import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import columns from './BaseTableColumns/columns';
import Lang from '../entities/Lang';

export default class Lang1601324673082 implements MigrationInterface {
    private readonly tableName = 'lang.lang';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.query('CREATE SCHEMA IF NOT EXISTS lang;');
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'localname',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_blocked',
            type: 'boolean',
            default: false,
          },
          ...columns,
        ],
      }), true);

      const langEN = new Lang();
      langEN.id = 'EN';
      langEN.localname = 'English';
      langEN.name = 'English';
      langEN.active = true;
      langEN.isBlocked = true;

      const langES = new Lang();
      langES.id = 'ES';
      langES.localname = 'Español';
      langES.name = 'Spanish';
      langES.active = true;
      langES.isBlocked = true;

      await queryRunner.manager.save(langEN);
      await queryRunner.manager.save(langES);
      await queryRunner.manager.query('CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.query('DROP EXTENSION IF EXISTS unaccent;');
      queryRunner.manager.query('DROP SCHEMA IF EXISTS lang;');
      await queryRunner.dropTable(this.tableName);
    }
}
