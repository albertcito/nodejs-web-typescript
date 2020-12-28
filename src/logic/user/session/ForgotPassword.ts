import { __ } from 'i18n';
import { arg, validateClass } from 'validatorjs-decorator/dist';

import User from 'src/db/entities/User';
import UserTokenEntity from 'src/db/entities/UserToken';
import MessageError from 'src/util/exceptions/MessageError';
import UserTypeEnum from './UserTokenEnum';
import UserToken from './UserToken';
import Email from 'src/util/email/Email';

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

  async sendEmail() {
    const user = await User.findOneOrFail({ where: { email: this.email } });
    const userToken = new UserToken(user.id);
    const link = await userToken.tokenLink(48, UserTypeEnum.RECOVERY_PASSWORD);
    const to = { name: user.fullName, address: this.email };
    await (new Email('emails.recoveryPassword')).send(
      { to, subject: 'Reset your password - Albertcito.com' },
      { name: user.fullName, link },
      user.id,
    );
  }
}

export default ForgotPassword;
