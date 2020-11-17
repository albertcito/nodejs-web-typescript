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
      query: `mutation translationDelete($id: Int!){
        translationDelete(id:$id) {
          message
          type
        }
      }`,
      variables: {
        id: translation.id,
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
