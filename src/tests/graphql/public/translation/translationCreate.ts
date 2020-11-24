import GenericTestData from '../../../config/GenericTestData';

export default class TranslationCreateTest implements GenericTestData {
  async resolver() {
    return {
      query: `mutation translationCreate($texts: [TextInputCreate!]!){
        translationCreate(texts: $texts) {
          data {
            id
            code
            texts {
              id
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
      'translationCreate.data.id': 'required|integer',
      'translationCreate.message.type': 'required|string',
      'translationCreate.message.message': 'required|string',
      'translationCreate.data.code': 'required|string',
      'translationCreate.texts': 'requiredArray',
      'translationCreate.texts.*.text': 'required|string',
      'translationCreate.texts.*.langID': 'required|string',
    };
  }
}
