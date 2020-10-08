import 'reflect-metadata';
import express, { Express } from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';

import publicServer from './graphql/public/server';
import privateServer from './graphql/private/server';
import ormconfig from '../../ormconfig.json';
import isAuthMiddleware from './middleware/isAuthMiddleware';

const getApp = async (): Promise<Express> => {
  const app = express();
  const db = await createConnection(ormconfig as ConnectionOptions);
  app.use('*', isAuthMiddleware);
  await privateServer(app, db);
  await publicServer(app, db);
  return app;
};

export default getApp;
