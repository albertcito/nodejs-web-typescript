import UserTokenEnum from './UserTokenEnum';
import UserTokenEntity from '../../db/entities/UserToken';
import frontend from '../../config';

class UserToken {
  private readonly userID: number;

  constructor(userID: number) {
    this.userID = userID;
  }

  /**
   *
   * @param expired in hours
   * @param type token
   */
  async newToken(expired: number, type: UserTokenEnum): Promise<UserTokenEntity> {
    const userToken = new UserTokenEntity();
    userToken.userID = this.userID;
    userToken.type = type;

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + expired);
    userToken.expiredAt = expiredAt;
    await userToken.save();
    return userToken;
  }

  async tokenLink(expired: number, type: UserTokenEnum): Promise<string> {
    const token = await this.newToken(expired, type);
    return frontend.URL.activeEmail.replace('%s', token.token);
  }
}

export default UserToken;
