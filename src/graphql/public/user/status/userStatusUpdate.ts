import { __ } from 'i18n';
import {
  Resolver, Mutation, Arg, Int,
} from 'type-graphql';

import User from '~src/db/entities/User';
import MessageError from '~src/util/exceptions/MessageError';
import MessageField from '~src/graphql/type/MessageField';
import UserStatusUpdate from '~src/logic/user/status/UserStatusUpdate';
import userStatus from '~src/logic/userStatus/userStatus.enum';

@Resolver()
export default class UserStatusUpdateResolver {
  @Mutation(() => MessageField, { description: 'Update user status. If it is inactive revoked all oAuth token' })
  async userStatusUpdate(
    @Arg('userStatusID', () => String) userStatusID: userStatus,
    @Arg('reason', () => String) reason: string,
    @Arg('userID', () => Int) userID: number,
  ): Promise<MessageField> {
    const user = await User.findOne(userID);
    if (!user) {
      throw new MessageError(__('The item %s does not exists', `${user}`));
    }
    return (new UserStatusUpdate(user)).save(userStatusID, reason);
  }
}
