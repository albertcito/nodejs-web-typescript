import { Express } from 'express';
import { Action, useExpressServer } from 'routing-controllers';
import { join } from 'path';

import { cors } from '../../config';
import rolesEnum from '../../logic/role/role.enum';
import getUserByOauthToken from '../../logic/user/session/getUserByOauthToken';

const useControllersApi = (app: Express) => {
  useExpressServer(app, {
    controllers: [join(__dirname, '../../../src/controllers/**/*{.ts,.js}')],
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
