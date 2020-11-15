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
      query: `mutation translationUpdate($translationID: Int!, $texts: [TextInputCreate!]!){
        translationUpdate(translationID: $translationID, texts: $texts) {
          data {
            translationID
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
        translationID: translation.translationID,
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
      'translationUpdate.data.translationID': 'required|integer',
      'translationUpdate.data.code': 'required|string',
      'translationUpdate.texts': 'requiredArray',
      'translationUpdate.texts.*.text': 'required|string',
      'translationUpdate.texts.*.langID': 'required|string',
      'translationUpdate.message.type': 'required|string',
      'translationUpdate.message.message': 'required|string',
    };
  }
}
