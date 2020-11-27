import GenericTestData from '../../../config/GenericTestData';

export default class RolesTest implements GenericTestData {
  resolver() {
    return {
      query: `query roles {
        roles {
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
            descriptionID
          }
        }
      }`,
    };
  }

  rules() {
    return {
      'roles.data': 'requiredArray',
      'roles.data.*.id': 'required|string',
      'roles.data.*.descriptionID': 'integer',
    };
  }
}
