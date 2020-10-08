import { Request, Response, NextFunction } from 'express';

import AuthenticationError from '../../util/exceptions/AuthenticationError';
import getUserByOauthToken from '../../logic/user/getUserByOauthToken';
import Auth from '../../util/session/Auth';

const isAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.params[0] ?? '';
  if (url !== '/graphql/private') {
    next();
    return;
  }
  getUserByOauthToken(req).then((user) => {
    Auth.setUser(user);
    next();
  }).catch((error) => {
    if (error instanceof AuthenticationError) {
      res.status(401).send({ message: error.message });
    } else {
      res.status(500).send({ message: error.message });
    }
  });
};

export default isAuthMiddleware;
