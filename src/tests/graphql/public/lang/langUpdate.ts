import GenericTestData from '~src/tests/config/GenericTestData';
import Lang from '../../../../db/entities/Lang';

export default class LangUpdateTest implements GenericTestData {
  async resolver() {
    const lang = new Lang();
    const langID = 'langUpdate';
    lang.langID = langID;
    lang.name = 'TEST';
    lang.localname = 'TEST';
    await lang.save();
    return {
      query: `mutation langUpdate($langID: String!, $name: String!, $localname: String!){
        langUpdate(langID: $langID, name: $name, localname: $localname) {
          data {
            langID
            name
            localname
          }
          message {
            type
            message
          }
        }
      }`,
      variables: {
        langID,
        name: 'Test',
        localname: 'Test',
      },
    };
  }

  rules() {
    return {
      langUpdate: 'required',
      'langUpdate.data.langID': 'required|string',
      'langUpdate.data.localname': 'required|string',
      'langUpdate.data.name': 'required|string',
      'langUpdate.message.type': 'required|string',
      'langUpdate.message.message': 'required|string',
    };
  }
}
