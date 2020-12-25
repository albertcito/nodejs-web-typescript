import { getConnection } from 'typeorm';
import { arg, validateClass } from 'validatorjs-decorator/dist';

import User from 'src/db/entities/User';
import UserTypeEnum from './UserTokenEnum';
import VerifyUserToken from './VerifyUserToken';

@validateClass()
class ActivateEmail {
  private readonly token: string;

  constructor(@arg('token', 'required|min:4') token: string) {
    this.token = token;
  }

  async activate() {
    const verifyUserToken = new VerifyUserToken(this.token, UserTypeEnum.ACTIVATE_EMAIL);
    const userToken = await verifyUserToken.getToken();

    const user = await User.findOne(userToken.userID);
    if (!user) {
      throw new Error('The user does not exist. It never should happens.');
    }

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      user.emailVerified = true;
      await user.save();

      userToken.usedAt = new Date();
      await userToken.save();

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
