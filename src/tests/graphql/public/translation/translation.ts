import GenericTestData from '~src/tests/config/GenericTestData';

export default class TranslationTest implements GenericTestData {
  resolver() {
    return {
      query: `query translation($translationID: Int!) {
        translation(translationID: $translationID) {
          translationID
          code
          texts {
            text
            langID
          }
        }
      }`,
      variables: {
        translationID: 1,
      },
    };
  }

  rules() {
    return {
      translation: 'required',
      'translation.translationID': 'required|integer',
      'translation.code': 'required|string',
      'translation.texts': 'requiredArray',
      'translation.texts.*.text': 'required|string',
      'translation.texts.*.langID': 'required|string',
    };
  }
}
