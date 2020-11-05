import GenericTestData from '~src/tests/config/GenericTestData';

export default class RolesTest implements GenericTestData {
  resolver() {
    return {
      query: `{
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
            roleID
            description
          }
        }
      }`,
    };
  }

  rules() {
    return {
      'roles.data': 'requiredArray',
      'roles.data.*.roleID': 'required|string',
      'roles.data.*.description': 'required|string',
    };
  }
}
