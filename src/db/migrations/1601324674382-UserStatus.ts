import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import columns from './BaseTableColumns/columns';
import UserStatus from '../entities/UserStatus';
import TranslationCreate from '../../logic/translation/TranslationCreate';
import userStatus from '../../logic/userStatus/userStatus.enum';

export default class UserStatus1601324674982 implements MigrationInterface {
    private readonly tableName = 'user_status';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'string',
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
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          ...columns,
        ],
      }), true);

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_status_name_translation',
        columnNames: ['name_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'translation',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_status_description_translation',
        columnNames: ['description_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'translation',
        onDelete: 'RESTRICT',
      }));
      await this.addDefaultValues();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }

    private async addDefaultValues() {
      const activeText = [
        {
          text: 'Active',
          langID: 'EN',
        },
        {
          text: 'Activo',
          langID: 'ES',
        },
      ];
      const activeTranslation = await (new TranslationCreate(activeText)).save();

      const active = new UserStatus();
      active.id = userStatus.active;
      active.nameID = activeTranslation.id;
      active.available = true;
      await active.save();

      const inactiveText = [
        {
          text: 'Inactive',
          langID: 'EN',
        },
        {
          text: 'Inactivo',
          langID: 'ES',
        },
      ];
      const inactiveTranslation = await (new TranslationCreate(inactiveText)).save();

      const inactive = new UserStatus();
      inactive.id = userStatus.inactive;
      inactive.nameID = inactiveTranslation.id;
      inactive.available = true;
      await inactive.save();
    }
}
