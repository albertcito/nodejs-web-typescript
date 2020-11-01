import { Request } from 'express';

import User from '../../../db/entities/User';
import OauthAccessToken from '../../../db/entities/OauthAccessToken';
import AuthenticationError from '../../../util/exceptions/AuthenticationError';
import Auth from '../../../util/session/Auth';

const getTokenFromHeader = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  throw new AuthenticationError('Not authorized, please login. (code: notToken)');
};

const getUserByOauthToken = async (req: Request) => {
  const token = getTokenFromHeader(req);

  const auth = await OauthAccessToken.findOne({ where: { token } });
  if (!auth) {
    throw new AuthenticationError('Not authorized, please login. (code: notFound)');
  }

  if (auth.revoked) {
    throw new AuthenticationError('Not authorized, please login. (code: revoked)');
  }

  const expiredAt = new Date(auth.expiredAt);
  const now = new Date();
  if (expiredAt.getTime() < now.getTime()) {
    throw new AuthenticationError('Not authorized, please login. (code: expired)');
  }

  const user = await User.findOne(auth.userID);
  if (!user) {
    throw new AuthenticationError('Not authorized, please login. (code: user)');
  }

  Auth.setData({
    user,
    auth,
  });

  return user;
};

export default getUserByOauthToken;
