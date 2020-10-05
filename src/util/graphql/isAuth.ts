import { Request } from 'express';
import { MiddlewareFn } from 'type-graphql';
import isUserAuth from '../../logic/user/isAuth';

const isAuth: MiddlewareFn<{ req: Request}> = async (
  { context: { req } },
  next,
) => isUserAuth(req, next);

export default isAuth;
