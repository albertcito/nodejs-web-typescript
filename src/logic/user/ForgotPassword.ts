import { arg, validateClass } from 'validatorjs-decorator/dist';
import User from '../../db/entities/User';
import UserToken from '../../db/entities/UserToken';
import MessageError from '../../util/exceptions/MessageError';
import UserTypeEnum from './UserTokenEnum';

@validateClass()
class ForgotPassword {
  private readonly email: string;

  constructor(@arg('email', 'required|email') email: string) {
    this.email = email;
  }

  async activate() {
    const user = await User.findOne({ where: { email: this.email } });
    if (!user) {
      throw new MessageError(`The email: "${this.email}" doesn't exist`);
    }
    const userToken = new UserToken();
    userToken.userID = user.userID;
    userToken.type = UserTypeEnum.RECOVERY_PASSWORD;

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 48);
    userToken.expiredAt = expiredAt;
    userToken.save();
  }
}

export default ForgotPassword;
