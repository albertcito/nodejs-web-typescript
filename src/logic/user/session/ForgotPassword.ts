import { __ } from 'i18n';
import { arg, validateClass } from 'validatorjs-decorator/dist';

import UserToken from './UserToken';
import UserTypeEnum from './UserTokenEnum';
import User from '../../../db/entities/User';
import UserTokenEntity from '../../../db/entities/UserToken';
import MessageError from '../../../util/exceptions/MessageError';

@validateClass()
class ForgotPassword {
  private readonly email: string;

  constructor(@arg('email', 'required|email') email: string) {
    this.email = email;
  }

  async getToken(): Promise<UserTokenEntity> {
    const user = await User.findOne({ where: { email: this.email } });
    if (!user) {
      throw new MessageError(__('The item %s does not exists', this.email));
    }
    const userToken = new UserToken(user.id);
    const token = await userToken.newToken(48, UserTypeEnum.RECOVERY_PASSWORD);
    return token;
  }
}

export default ForgotPassword;
