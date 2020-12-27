import { Request } from 'express';
import { MiddlewareFn } from 'type-graphql';

import getUserByOauthToken from 'src/logic/user/session/getUserByOauthToken';

const isAuth: MiddlewareFn<{ req: Request}> = async ({ context: { req } }, next) => {
  await getUserByOauthToken(req);
  return next();
};

export default isAuth;
