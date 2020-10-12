import { Request } from 'express';

import User from '../../db/entities/User';
import OauthAccessToken from '../../db/entities/OauthAccessToken';
import AuthenticationError from '../../util/exceptions/AuthenticationError';

const getTokenFromHeader = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  throw new AuthenticationError('Not authorized, please login. (code: notToken)');
};

const getUserByOauthToken = async (req: Request) => {
  const token = getTokenFromHeader(req);

  const userToken = await OauthAccessToken.findOne({ where: { token } });
  if (!userToken) {
    throw new AuthenticationError('Not authorized, please login. (code: notFound)');
  }

  const expiredAt = new Date(userToken.expiredAt);
  const now = new Date();
  if (expiredAt.getTime() < now.getTime()) {
    throw new AuthenticationError('Not authorized, please login. (code: expired)');
  }

  return User.findOne(userToken.userID);
};

export default getUserByOauthToken;
