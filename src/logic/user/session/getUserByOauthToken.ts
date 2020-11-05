import { Request } from 'express';

import User from '../../../db/entities/User';
import OauthAccessToken from '../../../db/entities/OauthAccessToken';
import HttpStatusError from '../../../util/exceptions/HttpStatusError';
import Auth from '../../../util/session/Auth';
import rolesEnum from '../../role/role.enum';
import verifyRolesUser from '../../userRole/verifyRolesUser';

const getTokenFromHeader = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  throw new HttpStatusError('Not authorized, please login. (code: notToken)');
};

const getUserByOauthToken = async (req: Request, roles: rolesEnum[] = []) => {
  const token = getTokenFromHeader(req);

  const auth = await OauthAccessToken.findOne({ where: { token } });
  if (!auth) {
    throw new HttpStatusError('Not authorized, please login. (code: notFound)');
  }

  if (auth.revoked) {
    throw new HttpStatusError('Not authorized, please login. (code: revoked)');
  }

  const expiredAt = new Date(auth.expiredAt);
  const now = new Date();
  if (expiredAt.getTime() < now.getTime()) {
    throw new HttpStatusError('Not authorized, please login. (code: expired)');
  }

  const user = await User.findOne(auth.userID);
  if (!user) {
    throw new HttpStatusError('Not authorized, please login. (code: user)');
  }

  if (roles.length > 0 && !verifyRolesUser(user.roles, roles)) {
    throw new HttpStatusError('You do not have right to use this area', 403);
  }

  Auth.setData({
    user,
    auth,
  });

  return user;
};

export default getUserByOauthToken;
