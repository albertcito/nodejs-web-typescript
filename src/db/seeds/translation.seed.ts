import { getConnection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import * as faker from 'faker';

import TranslationCreate from 'src/logic/translation/TranslationCreate';

const createTranslation = async () => {
  const translationCreate = new TranslationCreate([{
    text: faker.random.word(),
    langID: 'EN',
  }]);
  await translationCreate.save();
};

export default class CreateUsers implements Seeder {
  public async run(): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const promises = [];
      for (let index = 0; index < 50; index += 1) {
        promises.push(createTranslation());
      }
      await Promise.all(promises);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
