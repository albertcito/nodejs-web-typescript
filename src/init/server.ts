import 'reflect-metadata';
import express, { Express } from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import dotenv from 'dotenv';
import i18n from 'i18n';
import { join } from 'path';
import Bugsnag from '@bugsnag/js';

import apolloServer from './graphql/public/server';
import ormconfig from '../../ormconfig.json';
import '../util/validatorjs/rules';
import './i18n/index';
import './bugsnag';
import handleErrors from './handleErrors';
import useControllersApi from './controllers';

const getApp = async (): Promise<Express> => {
  dotenv.config();
  const app = express();
  const middleware = Bugsnag.getPlugin('express');
  // This must be the first piece of middleware in the stack.
  // It can only capture errors in downstream middleware
  if (middleware) {
    app.use(middleware.requestHandler);
  }
  // folder to put files
  app.use('/public', express.static(join(__dirname, '../../public')));
  // use multi languages
  app.use(i18n.init);
  // db conection
  const db = await createConnection(ormconfig as ConnectionOptions);
  // Apollo graphQL
  await apolloServer(app, db);
  // Api
  useControllersApi(app);
  // handle global errors
  app.use(handleErrors);
  // This handles any errors that Express catches
  if (middleware) {
    app.use(middleware.errorHandler);
  }
  return app;
};

export default getApp;
