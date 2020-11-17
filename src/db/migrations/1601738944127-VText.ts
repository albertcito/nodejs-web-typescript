import {
  MigrationInterface, QueryRunner,
} from 'typeorm';

export default class VText1601738944127 implements MigrationInterface {
    private readonly viewName = 'text';

    public async up(queryRunner: QueryRunner): Promise<void> {
      const view = `
        CREATE VIEW vtext AS SELECT
          translation.id as translation_id,
          translation.is_blocked,
          translation.code,
          lang.id as lang_id,
          lang.active,
          lang.localname,
          lang.name,
          CASE
              WHEN originalText.text IS NOT NULL THEN originalText.text
              ELSE text.text
          END AS text,
          CASE
              WHEN originalText.lang_id IS NOT NULL THEN originalText.lang_id
              ELSE text.lang_id
          END AS original_lang_id,
          CASE
              WHEN originalText.lang_id IS NOT NULL THEN true
              ELSE false
          END AS is_available,
          CASE
              WHEN originalText.created_at IS NOT NULL THEN originalText.created_at
              ELSE text.created_at
          END AS created_at,
          CASE
              WHEN originalText.updated_at IS NOT NULL THEN originalText.updated_at
              ELSE text.updated_at
          END AS updated_at,
          CASE
              WHEN originalText.created_by IS NOT NULL THEN originalText.created_by
              ELSE text.created_by
          END AS created_by,
          CASE
              WHEN originalText.updated_by IS NOT NULL THEN originalText.updated_by
              ELSE text.updated_by
          END AS updated_by
      FROM translation
      CROSS JOIN lang
      LEFT JOIN text text
          ON text.translation_id = translation.id
          AND text.lang_id = 'EN'
      LEFT JOIN text originalText
          ON originalText.translation_id = translation.id
          AND originalText.lang_id= lang.id`;
      await queryRunner.query(view);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropView(this.viewName);
    }
}
