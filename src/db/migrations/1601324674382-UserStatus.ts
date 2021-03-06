import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

import userStatus from 'src/logic/userStatus/userStatus.enum';
import columns from './BaseTableColumns/columns';
import UserStatus from '../entities/UserStatus';
import saveTranslation from '../util/saveTranslation';

export default class UserStatus1601324674982 implements MigrationInterface {
    private readonly tableName = 'user_status';

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
        referencedTableName: 'lang.translation',
        onDelete: 'RESTRICT',
      }));

      await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
        name: 'user_status_description_translation',
        columnNames: ['description_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lang.translation',
        onDelete: 'RESTRICT',
      }));
      await this.addDefaultValues(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }

    private async addDefaultValues(queryRunner: QueryRunner) {
      const activeTranslation = await saveTranslation(queryRunner, 'Active', 'Activo', 'active');
      await this.saveUserStatus(queryRunner, activeTranslation.id, userStatus.active);
      const disabledTranslation = await saveTranslation(queryRunner, 'Disabled', 'desactivado', 'disabled');
      await this.saveUserStatus(queryRunner, disabledTranslation.id, userStatus.disabled);
      const lockedTranslation = await saveTranslation(queryRunner, 'Locked', 'Bloqueado', 'locked');
      await this.saveUserStatus(queryRunner, lockedTranslation.id, userStatus.locked);
    }

    private async saveUserStatus(
      queryRunner:QueryRunner,
      translationID: number,
      status: userStatus,
    ) {
      const active = new UserStatus();
      active.id = status;
      active.nameID = translationID;
      active.available = true;
      await queryRunner.manager.save(active);
    }
}
