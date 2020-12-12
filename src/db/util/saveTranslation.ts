import { QueryRunner } from 'typeorm';

import Translation from '../entities/Translation';
import Text from '../entities/Text';

export default async function saveTranslation(
  queryRunner:QueryRunner,
  textEN: string,
  textES: string,
  code: string,
  isBlocked = true,
) {
  const activeTranslation = new Translation();
  activeTranslation.code = code;
  activeTranslation.isBlocked = isBlocked;
  await queryRunner.manager.save(activeTranslation);
  const tActiveEN = new Text();
  tActiveEN.text = textEN;
  tActiveEN.langID = 'EN';
  tActiveEN.translationID = activeTranslation.id;
  await queryRunner.manager.save(tActiveEN);
  const tActiveES = new Text();
  tActiveES.text = textES;
  tActiveES.langID = 'ES';
  tActiveES.translationID = activeTranslation.id;
  await queryRunner.manager.save(tActiveES);
  return activeTranslation;
}
