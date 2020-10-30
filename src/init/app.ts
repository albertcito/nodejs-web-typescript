import 'reflect-metadata';
import express, { Express } from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import dotenv from 'dotenv';
import i18n from 'i18n';
import { join } from 'path';

import apolloServer from './graphql/public/server';
import ormconfig from '../../ormconfig.json';
import '../util/validatorjs/rules';
import './i18n/index';
import handleErrors from './handleErrors';
import useControllersApi from './controllers';

const getApp = async (): Promise<Express> => {
  dotenv.config();
  const app = express();
  // folder to put files
  app.use('/public', express.static(join(__dirname, '../../public')));
  app.use(i18n.init);
  const db = await createConnection(ormconfig as ConnectionOptions);
  await apolloServer(app, db);
  useControllersApi(app);
  app.use(handleErrors);
  return app;
};

export default getApp;
