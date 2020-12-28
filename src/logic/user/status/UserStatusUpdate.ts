import { __ } from 'i18n';
import { getConnection } from 'typeorm';

import User from 'src/db/entities/User';
import MessageType from 'src/graphql/type/MessageType.enum';
import MessageField from 'src/graphql/type/MessageField';
import UserStatusReason from 'src/db/entities/UserStatusReason';
import MessageError from 'src/util/exceptions/MessageError';
import RevokeByUser from '../../oauth/revokeByUser';
import userStatus from '../../userStatus/userStatus.enum';

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
      if (this.user.userStatusID === userStatusID) {
        throw new MessageError(`The user ${this.user.id} already has the status ${userStatusID}`);
      }

      this.user.userStatusID = userStatusID;
      await this.user.save();

      const userReason = new UserStatusReason();
      userReason.userID = this.user.id;
      userReason.userStatusID = userStatusID;
      userReason.reason = reason;
      await userReason.save();

      if (userStatusID !== userStatus.active) {
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
