import { Request } from 'express';
import { createMethodDecorator } from 'type-graphql';
import getUserByOauthToken from '../../logic/user/session/getUserByOauthToken';
import rolesEnum from '../../logic/role/role.enum';
import verifyRolesUser from '../../logic/userRole/verifyRolesUser';
import HttpStatusError from '../exceptions/HttpStatusError';

export default function isAuthRolesGraphQL(roles: rolesEnum[]) {
  return createMethodDecorator<{ req: Request}>(async ({ context: { req } }, next) => {
    const user = await getUserByOauthToken(req);
    if (!verifyRolesUser(user.roles, roles)) {
      throw new HttpStatusError('You do not have right to use this area', 403);
    }
    return next();
  });
}
