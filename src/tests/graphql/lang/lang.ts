import GenericTestData from '../../config/GenericTestData';

export default class LangTest implements GenericTestData {
  resolver() {
    return {
      query: `query lang($id: String!) {
        lang(id: $id) {
          id
          localname
          name
        }
      }`,
      variables: {
        id: 'EN',
      },
    };
  }

  rules() {
    return {
      lang: 'required',
      'lang.id': 'required|string',
      'lang.localname': 'required|string',
      'lang.name': 'required|string',
    };
  }
}
