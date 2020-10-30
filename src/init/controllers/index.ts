import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { join } from 'path';

import corsConfig from '../cors';

const useControllersApi = (app: Express) => {
  useExpressServer(app, {
    controllers: [join(__dirname, '../../../src/controllers/**/*.ts')],
    cors: corsConfig(),
    routePrefix: 'api',
    defaultErrorHandler: false,
  });
};

export default useControllersApi;
