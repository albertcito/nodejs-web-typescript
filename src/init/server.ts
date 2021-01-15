import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import Bugsnag from '@bugsnag/js';
import { join } from 'path';
import i18n from 'i18n';
// import { graphqlUploadExpress } from 'graphql-upload';

import './i18n/index';
import './bugsnag';
import '../util/validatorjs/rules';
import handleErrors from './handleErrors';
import ApolloServer, { path } from './graphql/server';
import useControllersApi from './controllers';
import { cors } from 'src/config';

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
  // Apollo graphQL
  (await ApolloServer()).applyMiddleware({
    cors,
    app,
    path,
    bodyParserConfig: true,
  });
  // app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 10 }));
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
