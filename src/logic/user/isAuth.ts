import { AuthenticationError } from 'apollo-server-express';
import { NextFunction, Request } from 'express';

import User from '../../db/entities/User';
import UserToken from '../../db/entities/UserToken';

const getTokenFromHeader = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = async (req: Request, next: NextFunction) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    throw new AuthenticationError('Not authorized, please login. (code: 0)');
  }

  const userToken = await UserToken.findOne({ where: { token } });
  if (!userToken) {
    throw new AuthenticationError('Not authorized, please login. (code: 1)');
  }

  const expiredAt = new Date(userToken.expiredAt);
  const now = new Date();
  if (expiredAt.getTime() < now.getTime()) {
    throw new AuthenticationError('Not authorized, please login. (code: 2)');
  }

  const user = await User.findOne(userToken.userID);
  req.app.set('user', user);

  return next();
};

export default isAuth;
