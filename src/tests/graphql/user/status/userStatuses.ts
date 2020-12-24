import GenericTestData from '../../../config/GenericTestData';

export default class UserStatusReasonsTest implements GenericTestData {
  async resolver() {
    return {
      query: `query userStatuses {
        userStatuses {
          id
          nameID
        }
      }`,
    };
  }

  rules() {
    return {
      userStatuses: 'requiredArray',
      'userStatuses.*.id': 'required|string',
      'userStatuses.*.nameID': 'required|integer',
    };
  }
}
