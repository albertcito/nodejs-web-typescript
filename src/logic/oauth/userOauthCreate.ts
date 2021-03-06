import argon2 from 'argon2';

import OauthAccessToken from 'src/db/entities/OauthAccessToken';

const userOauthCreate = async (userID: number): Promise<OauthAccessToken> => {
  const signature = '!@#dRFWEtg5;4r$%GERT$pfkeork34RWEDFw,mf8934fWEF@#9cj0jf2923rDSFwemf280';
  const now = new Date();
  now.setHours(now.getHours() + 6);

  const auth = new OauthAccessToken();
  auth.token = await argon2.hash(signature);
  auth.signature = signature;
  auth.userID = userID;
  auth.expiredAt = now;
  await auth.save();
  return auth;
};

export default userOauthCreate;
