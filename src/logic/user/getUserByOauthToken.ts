import { Request } from 'express';

import User from '../../db/entities/User';
import OauthAccessToken from '../../db/entities/OauthAccessToken';
import AuthenticationError from '../../util/exceptions/AuthenticationError';

const getTokenFromHeader = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const getUserByOauthToken = async (req: Request) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    throw new AuthenticationError('Not authorized, please login. (code: 0)');
  }

  const userToken = await OauthAccessToken.findOne({ where: { token } });
  if (!userToken) {
    throw new AuthenticationError('Not authorized, please login. (code: 1)');
  }

  const expiredAt = new Date(userToken.expiredAt);
  const now = new Date();
  if (expiredAt.getTime() < now.getTime()) {
    throw new AuthenticationError('Not authorized, please login. (code: 2)');
  }

  return User.findOne(userToken.userID);
};

export default getUserByOauthToken;
