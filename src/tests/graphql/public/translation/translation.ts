import GenericTestData from '../../../config/GenericTestData';

export default class TranslationTest implements GenericTestData {
  resolver() {
    return {
      query: `query translation($id: Int!) {
        translation(id: $id) {
          id
          code
          texts {
            id
            text
            langID
          }
        }
      }`,
      variables: {
        id: 1,
      },
    };
  }

  rules() {
    return {
      translation: 'required',
      'translation.id': 'required|integer',
      'translation.code': 'required|string',
      'translation.texts': 'requiredArray',
      'translation.texts.*.text': 'required|string',
      'translation.texts.*.langID': 'required|string',
    };
  }
}
