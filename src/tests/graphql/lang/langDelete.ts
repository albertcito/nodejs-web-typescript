import Lang from 'src/db/entities/Lang';
import GenericTestData from '../../config/GenericTestData';

export default class LangDeleteTest implements GenericTestData {
  async resolver() {
    const lang = new Lang();
    const id = 'langDelete';
    lang.id = id;
    lang.name = 'TEST';
    lang.localname = 'TEST';
    await lang.save();
    return {
      query: `mutation langDelete($id: String!){
        langDelete(id:$id)
      }`,
      variables: {
        id,
      },
    };
  }

  rules() {
    return {
      langDelete: 'required|string',
    };
  }
}
