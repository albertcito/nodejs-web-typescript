import GenericTestData from '../../../config/GenericTestData';
import Lang from '../../../../db/entities/Lang';

export default class LangDeleteTest implements GenericTestData {
  async resolver() {
    const lang = new Lang();
    const langID = 'langDelete';
    lang.langID = langID;
    lang.name = 'TEST';
    lang.localname = 'TEST';
    await lang.save();
    return {
      query: `mutation langDelete($langID: String!){
        langDelete(langID:$langID)
      }`,
      variables: {
        langID,
      },
    };
  }

  rules() {
    return {
      langDelete: 'required|string',
    };
  }
}
