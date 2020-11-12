import OauthAccessToken from '~src/db/entities/OauthAccessToken';
import User from '~src/db/entities/User';

export default class RevokeByUser {
  private readonly user: User;

  public constructor(user: User) {
    this.user = user;
  }

  async revoke() {
    const promises = [];
    const oAuths = await OauthAccessToken.find({ where: { userID: this.user.userID } });
    for (let i = 0; i < oAuths.length; i += 1) {
      const oAuth = oAuths[i];
      oAuth.revoked = true;
      promises.push(oAuth.save());
    }
    await Promise.all(promises);
  }
}
