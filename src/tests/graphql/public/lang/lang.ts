import GenericTestData from '../../../config/GenericTestData';

export default class LangTest implements GenericTestData {
  resolver() {
    return {
      query: `query lang($langID: String!) {
        lang(langID: $langID) {
          langID
          localname
          name
        }
      }`,
      variables: {
        langID: 'EN',
      },
    };
  }

  rules() {
    return {
      lang: 'required',
      'lang.langID': 'required|string',
      'lang.localname': 'required|string',
      'lang.name': 'required|string',
    };
  }
}
