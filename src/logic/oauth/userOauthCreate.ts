import argon2 from 'argon2';
import OauthAccessToken from '../../db/entities/OauthAccessToken';

const userOauthCreate = async (userID: number): Promise<OauthAccessToken> => {
  const signature = 'MySuP3R_z3kr3t';
  const now = new Date();
  now.setHours(now.getHours() + 6);

  const userToken = new OauthAccessToken();
  userToken.token = await argon2.hash(signature);
  userToken.signature = signature;
  userToken.userID = userID;
  userToken.expiredAt = now;
  return userToken.save();
};

export default userOauthCreate;
