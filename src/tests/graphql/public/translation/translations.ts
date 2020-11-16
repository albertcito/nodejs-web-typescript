import GenericTestData from '~src/tests/config/GenericTestData';

export default class TranslationsTest implements GenericTestData {
  resolver() {
    return {
      query: `query translations {
        translations {
          pagination {
            from
            to
            total
            limit
            page
            length
          }
          data {
            id
            code
            texts {
              text
              langID
            }
          }
        }
      }`,
    };
  }

  rules() {
    return {
      'translations.data': 'requiredArray',
      'translations.data.*.id': 'required|integer',
      'translations.data.*.code': 'required|string',
      'translations.data.*.texts': 'requiredArray',
      'translations.data.*.texts.*.text': 'required|string',
      'translations.data.*.texts.*.langID': 'required|string',
    };
  }
}
