import { __ } from 'i18n';
import { getConnection } from 'typeorm';

import userStatus from '../../userStatus/userStatus.enum';
import RevokeByUser from '../../oauth/revokeByUser';
import User from '../../../db/entities/User';
import MessageType from '../../../graphql/type/MessageType.enum';
import MessageField from '../../../graphql/type/MessageField';
import UserStatusReason from '../../../db/entities/UserStatusReason';

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
      userReason.userID = this.user.id;
      userReason.userStatusID = userStatusID;
      userReason.reason = reason;
      await userReason.save();

      if (userStatusID === userStatus.inactive) {
        await (new RevokeByUser(this.user)).revoke();
      }

      await queryRunner.commitTransaction();

      return {
        message: __('The item %s was updated', `${this.user.id}`),
        type: MessageType.success,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new Error(error);
    }
  }
}
