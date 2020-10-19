import { arg, validateClass } from 'validatorjs-decorator/dist';
import User from '../../db/entities/User';
import UserTokenEntity from '../../db/entities/UserToken';
import UserToken from './UserToken';
import MessageError from '../../util/exceptions/MessageError';
import UserTypeEnum from './UserTokenEnum';

@validateClass()
class ForgotPassword {
  private readonly email: string;

  constructor(@arg('email', 'required|email') email: string) {
    this.email = email;
  }

  async getToken(): Promise<UserTokenEntity> {
    const user = await User.findOne({ where: { email: this.email } });
    if (!user) {
      throw new MessageError(`The email: "${this.email}" doesn't exist`);
    }
    const userToken = new UserToken(user.userID);
    const token = await userToken.newToken(48, UserTypeEnum.RECOVERY_PASSWORD);
    return token;
  }
}

export default ForgotPassword;