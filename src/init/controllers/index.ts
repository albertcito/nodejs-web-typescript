import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { join } from 'path';

import { cors } from '../../config';

const useControllersApi = (app: Express) => {
  useExpressServer(app, {
    controllers: [join(__dirname, '../../../src/controllers/**/*.ts')],
    cors,
    routePrefix: 'api',
    defaultErrorHandler: false,
  });
};

export default useControllersApi;
