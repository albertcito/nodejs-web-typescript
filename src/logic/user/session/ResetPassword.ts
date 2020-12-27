import argon2 from 'argon2';
import { arg, validateClass } from 'validatorjs-decorator/dist';

import User from 'src/db/entities/User';
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
      throw new Error('The user does not exist. It never should happens.');
    }

    user.password = await argon2.hash(this.password);
    await user.save();

    userToken.usedAt = new Date();
    await userToken.save();
  }
}

export default ResetPassword;
