import { getConnection } from 'typeorm';
import { arg, validateClass } from 'validatorjs-decorator/dist';
import User from '../../db/entities/User';
import MessageError from '../../util/exceptions/MessageError';
import UserTokenEnum from './UserTokenEnum';
import VerifyUserToken from './VerifyUserToken';

@validateClass()
class ResetPassword {
  private readonly token: string;

  private readonly password: string;

  constructor(
    @arg('token', 'required|min:4') token: string,
    @arg('password', 'required|min:4|strict_password') password: string,
  ) {
    this.token = token;
    this.password = password;
  }

  async save() {
    const verifyUserToken = new VerifyUserToken(this.token, UserTokenEnum.RECOVERY_PASSWORD);
    const userToken = await verifyUserToken.getToken();

    const user = await User.findOne(userToken.userID);
    if (!user) {
      throw new MessageError('The user does not exist');
    }

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      user.password = this.password;
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

export default ResetPassword;