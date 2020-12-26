import { arg, validateClass } from 'validatorjs-decorator/dist';

import UserTypeEnum from './UserTokenEnum';
import VerifyUserToken from './VerifyUserToken';
import User from '../../../db/entities/User';

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
    user.emailVerified = true;
    await user.save();

    userToken.usedAt = new Date();
    await userToken.save();
  }
}

export default ActivateEmail;
