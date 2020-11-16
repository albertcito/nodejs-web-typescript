import TranslationCreate from '~src/logic/translation/TranslationCreate';
import GenericTestData from '~src/tests/config/GenericTestData';

export default class TranslationDeleteTest implements GenericTestData {
  async resolver() {
    const translationCreate = new TranslationCreate([
      {
        text: 'TEST',
        langID: 'EN',
      },
      {
        text: 'TEST',
        langID: 'ES',
      },
    ]);
    const translation = await translationCreate.save();
    return {
      query: `mutation translationDelete($translationID: Int!){
        translationDelete(translationID:$translationID) {
          message
          type
        }
      }`,
      variables: {
        translationID: translation.translationID,
      },
    };
  }

  rules() {
    return {
      'translationDelete.message': 'required|string',
      'translationDelete.type': 'required|string',
    };
  }
}
