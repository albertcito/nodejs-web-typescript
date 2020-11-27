import Lang from '../../../../db/entities/Lang';
import GenericTestData from '../../../config/GenericTestData';

export default class LangUpdateTest implements GenericTestData {
  async resolver() {
    const lang = new Lang();
    const id = 'langUpdate';
    lang.id = id;
    lang.name = 'TEST';
    lang.localname = 'TEST';
    await lang.save();
    return {
      query: `mutation langUpdate($id: String!, $name: String!, $localname: String!){
        langUpdate(id: $id, name: $name, localname: $localname) {
          data {
            id
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
        id,
        name: 'Test',
        localname: 'Test',
      },
    };
  }

  rules() {
    return {
      langUpdate: 'required',
      'langUpdate.data.id': 'required|string',
      'langUpdate.data.localname': 'required|string',
      'langUpdate.data.name': 'required|string',
      'langUpdate.message.type': 'required|string',
      'langUpdate.message.message': 'required|string',
    };
  }
}
