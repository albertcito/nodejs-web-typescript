import { getConnection } from 'typeorm';
import { arg, validateClass } from 'validatorjs-decorator/dist';
import User from '../../db/entities/User';
import UserToken from '../../db/entities/UserToken';
import MessageError from '../../util/exceptions/MessageError';
import UserTypeEnum from './UserTokenEnum';

@validateClass()
class ActivateEmail {
  private readonly token: string;

  constructor(@arg('token', 'required|min:4') token: string) {
    this.token = token;
  }

  async activate() {
    const userToken = await UserToken.findOne({
      where: {
        token: this.token,
        type: UserTypeEnum.ACTIVATE_EMAIL,
      },
    });
    if (!userToken) {
      throw new MessageError('The token does not exist');
    }

    const expiredAt = new Date(userToken.expiredAt);
    const now = new Date();
    if (expiredAt.getTime() < now.getTime()) {
      throw new MessageError('The token was expired');
    }

    const user = await User.findOne(userToken.userID);
    if (!user) {
      throw new MessageError('The user does not exist');
    }

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      user.emailVerified = true;
      user.save();

      userToken.usedAt = new Date();
      userToken.save();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
}

export default ActivateEmail;
