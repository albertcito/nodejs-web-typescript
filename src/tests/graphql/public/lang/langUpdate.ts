import GenericTestData from '../../../config/GenericTestData';
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
          langID
          name
          localname
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
      'langUpdate.langID': 'required|string',
      'langUpdate.localname': 'required|string',
      'langUpdate.name': 'required|string',
    };
  }
}
