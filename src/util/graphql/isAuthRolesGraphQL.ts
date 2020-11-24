import { Request } from 'express';
import { createMethodDecorator } from 'type-graphql';

import getUserByOauthToken from '../../logic/user/session/getUserByOauthToken';
import rolesEnum from '../../logic/role/role.enum';

export default function isAuthRolesGraphQL(roles: rolesEnum[]) {
  return createMethodDecorator<{ req: Request}>(async ({ context: { req } }, next) => {
    await getUserByOauthToken(req, roles);
    return next();
  });
}
