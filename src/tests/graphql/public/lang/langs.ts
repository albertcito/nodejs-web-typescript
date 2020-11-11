import GenericTestData from '~src/tests/config/GenericTestData';

export default class LangTest implements GenericTestData {
  resolver() {
    return {
      query: `query langs {
        langs {
          pagination {
            from
            to
            total
            limit
            page
            length
          }
          data {
            langID
            localname
            name
          }
        }
      }`,
    };
  }

  rules() {
    return {
      'langs.data': 'requiredArray',
      'langs.data.*.langID': 'required|string',
      'langs.data.*.localname': 'required|string',
      'langs.data.*.name': 'required|string',
    };
  }
}
