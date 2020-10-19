import UserToken from '../../db/entities/UserToken';
import MessageError from '../../util/exceptions/MessageError';
import UserTokenEnum from './UserTokenEnum';

class VerifyUserToken {
  private readonly token: string;

  private readonly type: UserTokenEnum;

  constructor(token: string, type: UserTokenEnum) {
    this.token = token;
    this.type = type;
  }

  async getToken() {
    const userToken = await UserToken.findOne({
      where: {
        token: this.token,
        type: this.type,
      },
    });
    if (!userToken) {
      throw new MessageError('The token does not exist');
    }

    if (userToken.usedAt) {
      throw new MessageError('The token already was used');
    }

    const expiredAt = new Date(userToken.expiredAt);
    const now = new Date();
    if (expiredAt.getTime() < now.getTime()) {
      throw new MessageError('The token was expired');
    }

    return userToken;
  }
}

export default VerifyUserToken;
