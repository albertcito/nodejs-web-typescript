import argon2 from 'argon2';
import UserToken from '../../db/entities/UserToken';

const userTokenCreate = async (userID: number): Promise<UserToken> => {
  const signature = 'MySuP3R_z3kr3t';
  const now = new Date();
  now.setHours(now.getHours() + 6);

  const userToken = new UserToken();
  userToken.token = await argon2.hash(signature);
  userToken.signature = signature;
  userToken.userID = userID;
  userToken.expiredAt = now;
  return userToken.save();
};

export default userTokenCreate;
