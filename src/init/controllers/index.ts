import { Express } from 'express';
import { Action, useExpressServer } from 'routing-controllers';
import { join } from 'path';

import rolesEnum from 'src/logic/role/role.enum';
import getUserByOauthToken from 'src/logic/user/session/getUserByOauthToken';
import { cors } from 'src/config';

const useControllersApi = (app: Express) => {
  useExpressServer(app, {
    controllers: [join(__dirname, '../../controllers/**/*{.ts,.js}')],
    cors,
    routePrefix: 'api',
    defaultErrorHandler: false,
    authorizationChecker: async ({ request }: Action, roles: rolesEnum[]) => {
      await getUserByOauthToken(request, roles);
      return true;
    },
  });
};

export default useControllersApi;
