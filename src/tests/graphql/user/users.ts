import GenericTestData from 'src/tests/config/GenericTestData';

export default class UsersTest implements GenericTestData {
  resolver() {
    return {
      query: `{
        users {
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
            firstName
            lastName
            email
          }
        }
      }`,
    };
  }

  rules() {
    return {
      'langs.data': 'requiredArray',
      'users.data.*.id': 'required|integer',
      'users.data.*.firstName': 'required|string',
      'users.data.*.lastName': 'required|string',
      'users.data.*.email': 'required|email',
    };
  }
}
