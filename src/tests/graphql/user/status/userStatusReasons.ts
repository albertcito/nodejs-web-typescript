import UserStatusReason from '../../../../db/entities/UserStatusReason';
import GenericTestData from '../../../config/GenericTestData';

export default class UserStatusReasonsTest implements GenericTestData {
  async resolver() {
    const userStatusReason = await UserStatusReason.findOne();
    return {
      query: `query userStatusReasons($userID: Int!) {
        userStatusReasons(userID: $userID) {
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
            userID
            userStatusID
            reason
          }
        }
      }`,
      variables: {
        userID: userStatusReason?.userID,
      },
    };
  }

  rules() {
    return {
      'langs.data': 'requiredArray',
      'users.data.*.id': 'required|integer',
      'users.data.*.userID': 'required|integer',
      'users.data.*.userStatusID': 'required|string',
      'users.data.*.reason': 'required|string',
    };
  }
}
