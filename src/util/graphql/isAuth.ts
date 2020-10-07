import { Request } from 'express';
import { MiddlewareFn } from 'type-graphql';
import getUserByOauthToken from '../../logic/user/getUserByOauthToken';

const isAuth: MiddlewareFn<{ req: Request}> = async (
  { context: { req } },
  next,
) => {
  const user = await getUserByOauthToken(req);
  req.app.set('user', user);
  return next();
};

export default isAuth;
