import GenericTestData from '~src/tests/config/GenericTestData';
import TranslationCreate from '~src/logic/translation/TranslationCreate';

export default class TranslationUpdateTest implements GenericTestData {
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
      query: `mutation translationUpdate($id: Int!, $texts: [TextInputCreate!]!){
        translationUpdate(id: $id, texts: $texts) {
          data {
            id
            code
            texts {
              text
              langID
            }
          }
          message {
            type
            message
          }
        }
      }`,
      variables: {
        id: translation.id,
        texts: [
          {
            text: 'TEST_CREATE',
            langID: 'EN',
          },
          {
            text: 'TEST_CREATE_ES',
            langID: 'ES',
          },
        ],
      },
    };
  }

  rules() {
    return {
      translationUpdate: 'required',
      'translationUpdate.data.id': 'required|integer',
      'translationUpdate.data.code': 'required|string',
      'translationUpdate.texts': 'requiredArray',
      'translationUpdate.texts.*.text': 'required|string',
      'translationUpdate.texts.*.langID': 'required|string',
      'translationUpdate.message.type': 'required|string',
      'translationUpdate.message.message': 'required|string',
    };
  }
}
