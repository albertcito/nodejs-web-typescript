import UserTokenEnum from './UserTokenEnum';
import UserTokenEntity from '../../db/entities/UserToken';

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
}

export default UserToken;
