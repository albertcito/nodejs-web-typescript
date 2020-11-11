import { __ } from 'i18n';
import { getConnection } from 'typeorm';

import User from '~src/db/entities/User';
import MessageType from '~src/graphql/type/MessageType.enum';
import MessageField from '~src/graphql/type/MessageField';
import UserStatusReason from '~src/db/entities/UserStatusReason';
import userStatus from '~src/logic/userStatus/userStatus.enum';
import RevokeByUser from '~src/logic/oauth/revokeByUser';

export default class UserStatusUpdate {
  private readonly user: User

  public constructor(user: User) {
    this.user = user;
  }

  async save(userStatusID: userStatus, reason: string): Promise<MessageField> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      this.user.userStatusID = userStatusID;
      await this.user.save();

      const userReason = new UserStatusReason();
      userReason.userID = this.user.userID;
      userReason.userStatusID = userStatusID;
      userReason.reason = reason;
      await userReason.save();

      if (userStatusID === userStatus.inactive) {
        await (new RevokeByUser(this.user)).revoke();
      }

      await queryRunner.commitTransaction();

      return {
        message: __('The item %s was updated', `${this.user.userID}`),
        type: MessageType.success,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
}
