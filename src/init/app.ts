import 'reflect-metadata';
import express, { Express } from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import dotenv from 'dotenv';
import i18n from 'i18n';
import cors from 'cors';
import path from 'path';

import apolloServer from './graphql/public/server';
import ormconfig from '../../ormconfig.json';
import '../util/validatorjs/rules';
import './i18n/index';

const getApp = async (): Promise<Express> => {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use('/public', express.static(path.join(__dirname, '../../public')));
  app.use(i18n.init);
  const db = await createConnection(ormconfig as ConnectionOptions);
  await apolloServer(app, db);
  return app;
};

export default getApp;
