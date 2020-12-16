import GenericTestData from '../../../config/GenericTestData';
import userStatus from '../../../../logic/userStatus/userStatus.enum';

export default class UserStatusUpdateTest implements GenericTestData {
  resolver() {
    return {
      query: `mutation userStatusUpdate($userID: Int!, $userStatusID: String!, $reason: String!) {
        userStatusUpdate(userID: $userID, userStatusID: $userStatusID, reason: $reason) {
          message
          type
        }
      }`,
      variables: {
        userID: 1,
        userStatusID: userStatus.active,
        reason: 'test environment: updating user status',
      },
    };
  }

  rules() {
    return {
      userStatusUpdate: 'required',
      'userStatusUpdate.message': 'required|string',
      'userStatusUpdate.type': 'required|string',
    };
  }
}
